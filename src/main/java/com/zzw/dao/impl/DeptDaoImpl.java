package com.zzw.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.jdbc.Work;
import org.springframework.stereotype.Repository;

import com.zzw.dao.DeptDao;
import com.zzw.pojo.TreeNode;
import com.zzw.vo.ZDepartment;
import com.zzw.vo.ZJob;
import com.zzw.vo.ZRole;
@Repository
public class DeptDaoImpl extends BasicDaoImpl<ZDepartment> implements DeptDao {

	
	
	@Override
	public List<ZDepartment> queryRootsDeptNode() {
		return getCurrentSession().createQuery("from ZDepartment where department is null").list();
	}

	@Override
	public List<ZDepartment> queryChildRen(String id) {
		return getCurrentSession().createQuery("from ZDepartment where department.id = ?").setParameter(0, id).list();
	}

	@Override
	public int clearJobs(final ZDepartment dept) {
		getCurrentSession().createSQLQuery("delete j.* from user_job j LEFT JOIN zjob z on z.id = j.job_id where z.department_id = ?").setParameter(0, dept.getId()).executeUpdate();
		return getCurrentSession().createSQLQuery("delete z.* from  zjob z  where z.department_id = ?").setParameter(0, dept.getId()).executeUpdate();
		/*getCurrentSession().doWork(new Work() {
			
			@Override
			public void execute(Connection connection) throws SQLException {
				
				PreparedStatement preStat = connection.prepareStatement("delete j.*,z.* from user_job j LEFT JOIN zjob z on z.id = j.job_id where z.department_id = ?");
				preStat.setString(1, dept.getId());
				preStat.execute();
				preStat = connection.prepareStatement("delete z.* from  zjob z  where z.department_id = ?");
				preStat.setString(1, dept.getId());
				preStat.execute();
			}
		});
		return 1;*/
	}

	@Override
	public void addJobs(ZDepartment dept,String[] ids) {
		ZJob job = new ZJob();
		for (int i = 0  ; i < ids.length ; i++) {
			job.setRole(new ZRole(ids[i]));
			job.setDepartment(dept);
			getCurrentSession().persist(job);
			job = new ZJob();
			if((i+1)%50 == 0){
				getCurrentSession().flush();
				getCurrentSession().clear();
			}
		}
		
		
		/*getCurrentSession().doWork(new Work() {
			@Override
			public void execute(Connection connection) throws SQLException {
				String insertSql = "insert into zjob (id,department_id,role_id) values(?,?,?)";
				connection.setAutoCommit(false);
				PreparedStatement stmt = connection.prepareStatement(insertSql);
				for (int i = 0; i < ids.length; i++) {
					stmt.setString(0, );
					stmt.setString(1, dept.getId());
					stmt.setString(2, ids[i]);
					stmt.addBatch();
				}
			}
		});*/
		
	}

	@Override
	public void deleteJobs(ZDepartment dept, String[] deleteId) {
		List<ZJob> job = new ArrayList<ZJob>();
		for (int i = 0  ; i < deleteId.length ; i++) {
			job =  getCurrentSession().createQuery("from ZJob where role.id = ? and department.id = ?")
			.setParameter(0, deleteId[i]).setParameter(1, dept.getId()).list();
			if(null != job && 0 < job.size()){
				for (ZJob zJob : job) {
					getCurrentSession().delete(zJob);
				}
			}
				
			if((i+1)%50 == 0){
				getCurrentSession().flush();
				getCurrentSession().clear();
			}
		}
		
	}

}
