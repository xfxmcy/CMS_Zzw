------------------流程实例数据部分-----------------  
delete from jbpm4_variable;--流程实例变量表  
delete from JBPM4_PARTICIPATION;--任务参与者，任务的相关用户，区别于任务的分配人  
delete from jbpm4_task;--任务表  
delete from jbpm4_property;--JBPM引擎参数表  
delete from jbpm4_hist_actinst;--流程节点(活动)历史表  
delete from jbpm4_hist_procinst;--流程实例历史表  
delete from JBPM4_HIST_DETAIL--保存流程实例、活动实例、任务实例运行过程中历史明细数据  
delete from jbpm4_hist_task;--保存历史的任务实例记录  
update jbpm4_execution set instance_=null;   
delete from jbpm4_execution;--流程实例表  
  
  
------------------流程定义部分----------------- 
delete from jbpm4_lob;--存储流程定义相关的资源信息  
delete from jbpm4_deployprop;--已部署的流程定义的具体属性   
delete from jbpm4_deployment;--流程定义的部署记录  

   