package com.zzw.dao.impl;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.zzw.vo.ZJob;
import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Repository;

import com.zzw.dao.RoleDao;
import com.zzw.pojo.Pages;
import com.zzw.vo.ZRole;
/**
 * 
 * ClassName:RoleDaoImpl role dao Impl
 *
 * @author   李丛阳
 * @version  
 * @since    Ver 1.1
 * @Date	 2015	2015年10月23日		下午2:22:16
 *
 * @see
 */
@Repository
public class RoleDaoImpl extends BasicDaoImpl<ZRole> implements RoleDao {

	@Override
	public List<ZRole> queryZrolePaegdByDept(Map<String, Object> param, Pages page) {
		return createSqlQueryByMap("SELECT r.id,r.code,r.name,"
				+ "IF ( "
				+ "(select count(*) from ZJob z where z.role_id =r.id and z.department_id = :departmentId) > 0,'1','0'"
				+ ") AS checked FROM ZRole r ORDER BY checked desc, r.code asc"
				,param).addEntity(ZRole.class).setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	@Override
	public Long queryCountZrole() {
		Object result = getCurrentSession().createQuery("select count(*) from ZRole").uniqueResult();
		return (null == result ? 0 : (Long)result);
	}

	@Override
	public List<ZRole> queryZrolePage(Pages page) {
		return getCurrentSession().createQuery("from ZRole order by code asc").setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	@Override
	public void removeRoleCascase(ZRole role) {
		getCurrentSession().createSQLQuery("delete j.* from user_job j LEFT JOIN zjob z on z.id = j.job_id where z.role_id = ?").setParameter(0, role.getId()).executeUpdate();
		this.removeGeneral(role.getClass(),role.getId());
	}

	/**
	 * query jobs by user
	 *
	 * @param param
	 * @param page
	 * @return jobs
	 */
	@Override
	public List<ZJob> queryZJobPaegdByUser(Map<String, Object> param, Pages page) {
		return createSqlQueryByMap("SELECT j.id,j.department_id,j.role_id,"
						+ "IF ( "
						+ "(SELECT  count(*) FROM user_job uj WHERE uj.job_id = j.id AND uj.user_id = :userId) > 0,'1','0' "
						+ ") AS checked FROM zjob j ORDER BY checked desc, j.department_id asc"
				,param).addEntity(ZJob.class).setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	/**
	 * 查询job 总数
	 *
	 * @return
	 */
	@Override
	public Long queryZJobCount() {
		Object result = getCurrentSession().createQuery("select count(*) from ZJob").uniqueResult();
		return (null == result ? 0 : (Long)result);
	}

	/**
	 * 分页查询 zjob
	 *
	 * @param page
	 * @return
	 */
	@Override
	public List<ZJob> queryZJobPaegd(Pages page) {
		return getCurrentSession().createQuery("from ZJob order by department.id asc").setFirstResult(page.getBeginIndex())
				.setMaxResults(page.getCount()).list();
	}

	/**
	 * add jobs for user
	 *
	 * @param userId user
	 * @param addId  job ids
	 */
	@Override
	public void addJobs(final String userId,final String[] addId) {

			getCurrentSession().doWork(new Work() {
				@Override
				public void execute(Connection connection) throws SQLException {
					PreparedStatement stmt = null ;
					try {
						for (int i = 0; i < addId.length; i++) {
							String insertSql = "insert into user_job (user_id,job_id) values(?,?)";
							//connection.setAutoCommit(false);
							stmt = connection.prepareStatement(insertSql);
							stmt.setString(1, userId);
							stmt.setString(2, addId[i]);
							stmt.execute();
						}
						//getCurrentSession().getTransaction().commit();
					}finally {
						stmt.close();
					}
				}
			});

	}

	/**
	 * delete jobs for user
	 *
	 * @param userId   user
	 * @param deleteId job ids
	 */
	@Override
	public void deleteJobs(String userId, String[] deleteId) {
		for (int i = 0  ; i < deleteId.length ; i++) {
			getCurrentSession().createSQLQuery("delete from user_job where job_id = ? and user_id = ?")
					.setParameter(0, deleteId[0])
					.setParameter(1,userId).executeUpdate();
			if((i+1)%50 == 0){
				getCurrentSession().flush();
				getCurrentSession().clear();
			}
		}
	}
}
