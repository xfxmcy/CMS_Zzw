/*
Navicat MySQL Data Transfer

Source Server         : m127.0.0.1(5.6)
Source Server Version : 50613
Source Host           : 127.0.0.1:3306
Source Database       : zz

Target Server Type    : MYSQL
Target Server Version : 50613
File Encoding         : 65001

Date: 2015-12-25 15:53:19
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for jbpm4_deployment
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_deployment`;
CREATE TABLE `jbpm4_deployment` (
  `DBID_` bigint(20) NOT NULL,
  `NAME_` text,
  `TIMESTAMP_` bigint(20) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_deployment
-- ----------------------------
INSERT INTO `jbpm4_deployment` VALUES ('1', 'Cy', '0', 'active');
INSERT INTO `jbpm4_deployment` VALUES ('10001', 'buy car', '0', 'active');
INSERT INTO `jbpm4_deployment` VALUES ('90001', 'buy car', '0', 'active');

-- ----------------------------
-- Table structure for jbpm4_deployprop
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_deployprop`;
CREATE TABLE `jbpm4_deployprop` (
  `DBID_` bigint(20) NOT NULL,
  `DEPLOYMENT_` bigint(20) DEFAULT NULL,
  `OBJNAME_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `STRINGVAL_` varchar(255) DEFAULT NULL,
  `LONGVAL_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_DEPLPROP_DEPL` (`DEPLOYMENT_`),
  CONSTRAINT `FK_DEPLPROP_DEPL` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_deployprop
-- ----------------------------
INSERT INTO `jbpm4_deployprop` VALUES ('3', '1', 'app', 'langid', 'jpdl-4.4', null);
INSERT INTO `jbpm4_deployprop` VALUES ('4', '1', 'app', 'pdid', 'app-1', null);
INSERT INTO `jbpm4_deployprop` VALUES ('5', '1', 'app', 'pdkey', 'app', null);
INSERT INTO `jbpm4_deployprop` VALUES ('6', '1', 'app', 'pdversion', null, '1');
INSERT INTO `jbpm4_deployprop` VALUES ('10003', '10001', 'car', 'langid', 'jpdl-4.4', null);
INSERT INTO `jbpm4_deployprop` VALUES ('10004', '10001', 'car', 'pdid', 'car-1', null);
INSERT INTO `jbpm4_deployprop` VALUES ('10005', '10001', 'car', 'pdkey', 'car', null);
INSERT INTO `jbpm4_deployprop` VALUES ('10006', '10001', 'car', 'pdversion', null, '1');
INSERT INTO `jbpm4_deployprop` VALUES ('90003', '90001', 'car', 'langid', 'jpdl-4.4', null);
INSERT INTO `jbpm4_deployprop` VALUES ('90004', '90001', 'car', 'pdid', 'car-2', null);
INSERT INTO `jbpm4_deployprop` VALUES ('90005', '90001', 'car', 'pdkey', 'car', null);
INSERT INTO `jbpm4_deployprop` VALUES ('90006', '90001', 'car', 'pdversion', null, '2');

-- ----------------------------
-- Table structure for jbpm4_execution
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_execution`;
CREATE TABLE `jbpm4_execution` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ACTIVITYNAME_` varchar(255) DEFAULT NULL,
  `PROCDEFID_` varchar(255) DEFAULT NULL,
  `HASVARS_` bit(1) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `SUSPHISTSTATE_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `HISACTINST_` bigint(20) DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  `INSTANCE_` bigint(20) DEFAULT NULL,
  `SUPEREXEC_` bigint(20) DEFAULT NULL,
  `SUBPROCINST_` bigint(20) DEFAULT NULL,
  `PARENT_IDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  UNIQUE KEY `ID_` (`ID_`),
  KEY `FK_EXEC_SUBPI` (`SUBPROCINST_`),
  KEY `FK_EXEC_INSTANCE` (`INSTANCE_`),
  KEY `FK_EXEC_SUPEREXEC` (`SUPEREXEC_`),
  KEY `FK_EXEC_PARENT` (`PARENT_`),
  CONSTRAINT `FK_EXEC_INSTANCE` FOREIGN KEY (`INSTANCE_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_PARENT` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_SUBPI` FOREIGN KEY (`SUBPROCINST_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_EXEC_SUPEREXEC` FOREIGN KEY (`SUPEREXEC_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_execution
-- ----------------------------
INSERT INTO `jbpm4_execution` VALUES ('80008', 'pvm', '5', 'registerCar', 'car-1', '', null, null, 'car.80008', 'active-root', null, '0', '130006', null, '80008', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('80015', 'pvm', '2', 'car', 'car-1', '', null, null, 'car.80015', 'active-root', null, '0', '120008', null, '80015', null, null, null);
INSERT INTO `jbpm4_execution` VALUES ('80022', 'pvm', '2', 'car', 'car-1', '', null, null, 'car.80022', 'active-root', null, '0', '110003', null, '80022', null, null, null);

-- ----------------------------
-- Table structure for jbpm4_hist_actinst
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_actinst`;
CREATE TABLE `jbpm4_hist_actinst` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `EXECUTION_` varchar(255) DEFAULT NULL,
  `ACTIVITY_NAME_` varchar(255) DEFAULT NULL,
  `START_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `TRANSITION_` varchar(255) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_HACTI_HPROCI` (`HPROCI_`),
  KEY `FK_HTI_HTASK` (`HTASK_`),
  CONSTRAINT `FK_HACTI_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HTI_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_actinst
-- ----------------------------
INSERT INTO `jbpm4_hist_actinst` VALUES ('80014', 'task', '1', '80008', 'task', 'car.80008', 'assessApplication', '2015-12-15 09:51:22', '2015-12-16 15:01:54', '105032145', 'pass', '1', '80012');
INSERT INTO `jbpm4_hist_actinst` VALUES ('80021', 'task', '1', '80015', 'task', 'car.80015', 'assessApplication', '2015-12-15 10:00:41', '2015-12-16 15:09:44', '104942920', 'pass', '1', '80019');
INSERT INTO `jbpm4_hist_actinst` VALUES ('80028', 'task', '1', '80022', 'task', 'car.80022', 'assessApplication', '2015-12-15 10:04:21', '2015-12-16 13:48:21', '99840345', 'pass', '1', '80026');
INSERT INTO `jbpm4_hist_actinst` VALUES ('110003', 'task', '0', '80022', 'task', 'car.80022', 'car', '2015-12-16 13:48:22', null, '0', null, '1', '110002');
INSERT INTO `jbpm4_hist_actinst` VALUES ('120006', 'task', '1', '80008', 'task', 'car.80008', 'car', '2015-12-16 15:01:55', '2015-12-16 15:10:51', '536465', 'choose car', '1', '120005');
INSERT INTO `jbpm4_hist_actinst` VALUES ('120008', 'task', '0', '80015', 'task', 'car.80015', 'car', '2015-12-16 15:09:45', null, '0', null, '1', '120007');
INSERT INTO `jbpm4_hist_actinst` VALUES ('120012', 'task', '1', '80008', 'task', 'car.80008', 'registerCar', '2015-12-16 15:10:52', '2015-12-17 15:31:16', '87623524', 'reject', '1', '120010');
INSERT INTO `jbpm4_hist_actinst` VALUES ('130002', 'task', '1', '80008', 'task', 'car.80008', 'car', '2015-12-17 15:31:17', '2015-12-17 15:33:38', '141212', 'choose car', '1', '130001');
INSERT INTO `jbpm4_hist_actinst` VALUES ('130006', 'task', '0', '80008', 'task', 'car.80008', 'registerCar', '2015-12-17 15:33:38', null, '0', null, '1', '130004');

-- ----------------------------
-- Table structure for jbpm4_hist_detail
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_detail`;
CREATE TABLE `jbpm4_hist_detail` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `USERID_` varchar(255) DEFAULT NULL,
  `TIME_` datetime DEFAULT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `HPROCIIDX_` int(11) DEFAULT NULL,
  `HACTI_` bigint(20) DEFAULT NULL,
  `HACTIIDX_` int(11) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  `HTASKIDX_` int(11) DEFAULT NULL,
  `HVAR_` bigint(20) DEFAULT NULL,
  `HVARIDX_` int(11) DEFAULT NULL,
  `MESSAGE_` text,
  `OLD_STR_` varchar(255) DEFAULT NULL,
  `NEW_STR_` varchar(255) DEFAULT NULL,
  `OLD_INT_` int(11) DEFAULT NULL,
  `NEW_INT_` int(11) DEFAULT NULL,
  `OLD_TIME_` datetime DEFAULT NULL,
  `NEW_TIME_` datetime DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  `PARENT_IDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_HDETAIL_HVAR` (`HVAR_`),
  KEY `FK_HDETAIL_HPROCI` (`HPROCI_`),
  KEY `FK_HDETAIL_HTASK` (`HTASK_`),
  KEY `FK_HDETAIL_HACTI` (`HACTI_`),
  CONSTRAINT `FK_HDETAIL_HACTI` FOREIGN KEY (`HACTI_`) REFERENCES `jbpm4_hist_actinst` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`),
  CONSTRAINT `FK_HDETAIL_HVAR` FOREIGN KEY (`HVAR_`) REFERENCES `jbpm4_hist_var` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_detail
-- ----------------------------
INSERT INTO `jbpm4_hist_detail` VALUES ('110001', 'comment', '0', null, '2015-12-16 13:48:21', null, null, null, null, '80026', '1', null, null, '买吧  2W报销', null, null, null, null, null, null, null, null);
INSERT INTO `jbpm4_hist_detail` VALUES ('120004', 'comment', '0', null, '2015-12-16 15:01:54', null, null, null, null, '80012', '1', null, null, '只报6W', null, null, null, null, null, null, null, null);
INSERT INTO `jbpm4_hist_detail` VALUES ('120009', 'comment', '0', null, '2015-12-16 15:09:45', null, null, null, null, '80019', '1', null, null, '宝马 买去吧  不报销', null, null, null, null, null, null, null, null);
INSERT INTO `jbpm4_hist_detail` VALUES ('120013', 'comment', '0', null, '2015-12-16 15:10:52', null, null, null, null, '120005', '1', null, null, '选完了 大众 标志 ', null, null, null, null, null, null, null, null);
INSERT INTO `jbpm4_hist_detail` VALUES ('130003', 'comment', '0', null, '2015-12-17 15:31:17', null, null, null, null, '120010', '1', null, null, '到底选的什么车 看不出来  不行', null, null, null, null, null, null, null, null);
INSERT INTO `jbpm4_hist_detail` VALUES ('130007', 'comment', '0', null, '2015-12-17 15:33:38', null, null, null, null, '130001', '1', null, null, '就买一辆 大众而已啊', null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for jbpm4_hist_procinst
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_procinst`;
CREATE TABLE `jbpm4_hist_procinst` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `PROCDEFID_` varchar(255) DEFAULT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `START_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `ENDACTIVITY_` varchar(255) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_procinst
-- ----------------------------
INSERT INTO `jbpm4_hist_procinst` VALUES ('80008', '0', 'car.80008', 'car-1', null, '2015-12-15 09:51:22', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('80015', '0', 'car.80015', 'car-1', null, '2015-12-15 10:00:41', null, null, 'active', null, '1');
INSERT INTO `jbpm4_hist_procinst` VALUES ('80022', '0', 'car.80022', 'car-1', null, '2015-12-15 10:04:21', null, null, 'active', null, '1');

-- ----------------------------
-- Table structure for jbpm4_hist_task
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_task`;
CREATE TABLE `jbpm4_hist_task` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `EXECUTION_` varchar(255) DEFAULT NULL,
  `OUTCOME_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `CREATE_` datetime DEFAULT NULL,
  `END_` datetime DEFAULT NULL,
  `DURATION_` bigint(20) DEFAULT NULL,
  `NEXTIDX_` int(11) DEFAULT NULL,
  `SUPERTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_HSUPERT_SUB` (`SUPERTASK_`),
  CONSTRAINT `FK_HSUPERT_SUB` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_task
-- ----------------------------
INSERT INTO `jbpm4_hist_task` VALUES ('80012', '1', 'car.80008', 'pass', '1', '0', 'completed', '2015-12-15 09:51:22', '2015-12-16 15:01:54', '105032152', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('80019', '2', 'car.80015', 'pass', '1', '0', 'completed', '2015-12-15 10:00:41', '2015-12-16 15:09:44', '104942925', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('80026', '1', 'car.80022', 'pass', null, '0', 'completed', '2015-12-15 10:04:21', '2015-12-16 13:48:21', '99840370', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('110002', '0', 'car.80022', null, '1', '0', null, '2015-12-16 13:48:22', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('120005', '2', 'car.80008', 'choose car', '1', '0', 'completed', '2015-12-16 15:01:55', '2015-12-16 15:10:51', '536478', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('120007', '0', 'car.80015', null, '1', '0', null, '2015-12-16 15:09:45', null, '0', '1', null);
INSERT INTO `jbpm4_hist_task` VALUES ('120010', '2', 'car.80008', 'reject', '1', '0', 'completed', '2015-12-16 15:10:52', '2015-12-17 15:31:16', '87623545', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('130001', '2', 'car.80008', 'choose car', '1', '0', 'completed', '2015-12-17 15:31:17', '2015-12-17 15:33:38', '141245', '2', null);
INSERT INTO `jbpm4_hist_task` VALUES ('130004', '0', 'car.80008', null, null, '0', null, '2015-12-17 15:33:38', null, '0', '1', null);

-- ----------------------------
-- Table structure for jbpm4_hist_var
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_hist_var`;
CREATE TABLE `jbpm4_hist_var` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `PROCINSTID_` varchar(255) DEFAULT NULL,
  `EXECUTIONID_` varchar(255) DEFAULT NULL,
  `VARNAME_` varchar(255) DEFAULT NULL,
  `VALUE_` varchar(255) DEFAULT NULL,
  `HPROCI_` bigint(20) DEFAULT NULL,
  `HTASK_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_HVAR_HPROCI` (`HPROCI_`),
  KEY `FK_HVAR_HTASK` (`HTASK_`),
  CONSTRAINT `FK_HVAR_HPROCI` FOREIGN KEY (`HPROCI_`) REFERENCES `jbpm4_hist_procinst` (`DBID_`),
  CONSTRAINT `FK_HVAR_HTASK` FOREIGN KEY (`HTASK_`) REFERENCES `jbpm4_hist_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_hist_var
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_group
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_group`;
CREATE TABLE `jbpm4_id_group` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `PARENT_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_GROUP_PARENT` (`PARENT_`),
  CONSTRAINT `FK_GROUP_PARENT` FOREIGN KEY (`PARENT_`) REFERENCES `jbpm4_id_group` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_group
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_membership
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_membership`;
CREATE TABLE `jbpm4_id_membership` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `USER_` bigint(20) DEFAULT NULL,
  `GROUP_` bigint(20) DEFAULT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_MEM_GROUP` (`GROUP_`),
  KEY `FK_MEM_USER` (`USER_`),
  CONSTRAINT `FK_MEM_GROUP` FOREIGN KEY (`GROUP_`) REFERENCES `jbpm4_id_group` (`DBID_`),
  CONSTRAINT `FK_MEM_USER` FOREIGN KEY (`USER_`) REFERENCES `jbpm4_id_user` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_membership
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_id_user
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_id_user`;
CREATE TABLE `jbpm4_id_user` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `ID_` varchar(255) DEFAULT NULL,
  `PASSWORD_` varchar(255) DEFAULT NULL,
  `GIVENNAME_` varchar(255) DEFAULT NULL,
  `FAMILYNAME_` varchar(255) DEFAULT NULL,
  `BUSINESSEMAIL_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_id_user
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_job
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_job`;
CREATE TABLE `jbpm4_job` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `DUEDATE_` datetime DEFAULT NULL,
  `STATE_` varchar(255) DEFAULT NULL,
  `ISEXCLUSIVE_` bit(1) DEFAULT NULL,
  `LOCKOWNER_` varchar(255) DEFAULT NULL,
  `LOCKEXPTIME_` datetime DEFAULT NULL,
  `EXCEPTION_` text,
  `RETRIES_` int(11) DEFAULT NULL,
  `PROCESSINSTANCE_` bigint(20) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `CFG_` bigint(20) DEFAULT NULL,
  `SIGNAL_` varchar(255) DEFAULT NULL,
  `EVENT_` varchar(255) DEFAULT NULL,
  `REPEAT_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_JOB_CFG` (`CFG_`),
  CONSTRAINT `FK_JOB_CFG` FOREIGN KEY (`CFG_`) REFERENCES `jbpm4_lob` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_job
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_lob
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_lob`;
CREATE TABLE `jbpm4_lob` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `BLOB_VALUE_` blob,
  `DEPLOYMENT_` bigint(20) DEFAULT NULL,
  `NAME_` text,
  PRIMARY KEY (`DBID_`),
  KEY `FK_LOB_DEPLOYMENT` (`DEPLOYMENT_`),
  CONSTRAINT `FK_LOB_DEPLOYMENT` FOREIGN KEY (`DEPLOYMENT_`) REFERENCES `jbpm4_deployment` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_lob
-- ----------------------------
INSERT INTO `jbpm4_lob` VALUES ('2', '0', 0x3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0A0A3C70726F63657373206E616D653D226170702220786D6C6E733D22687474703A2F2F6A62706D2E6F72672F342E342F6A70646C22206B65793D22617070223E0D0A2020200D0A2020200D0A2020203C737461727420673D223139322C302C34382C343822206E616D653D22737461727431223E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D227375626D69742220746F3D2261646D696E417373657373222F3E0D0A2020203C2F73746172743E0D0A0D0A2020200D0A0D0A2020203C7461736B20673D223136342C39372C39322C353222206E616D653D2261646D696E417373657373223E0D0A2020200920203C61737369676E6D656E742D68616E646C657220636C6173733D22636F6D2E7A7A772E776F726B666C6F772E61737369676E61626C652E41707041737365737341737369676E61626C65223E0D0A202020092020093C6669656C64206E616D653D2261737369676E6565526F6C654964223E0D0A20202009202009093C737472696E672076616C75653D2234222F3E0D0A202020092020093C2F6669656C643E0D0A2020200920203C2F61737369676E6D656E742D68616E646C65723E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D22616476616E6365206173737773732220746F3D22616476616E636541646D696E417373657373222F3E0D0A2020203C2F7461736B3E0D0A2020200D0A2020203C7461736B20673D223136332C3139372C39322C353222206E616D653D22616476616E636541646D696E417373657373223E0D0A2020202020203C7472616E736974696F6E20673D222D35302C2D323222206E616D653D22746F20656E64312220746F3D22656E6431222F3E0D0A2020203C2F7461736B3E0D0A090D0A2020203C656E6420673D223138362C3238362C34382C343822206E616D653D22656E6431222F3E0D0A3C2F70726F636573733E, '1', 'E:\\developEnvironment\\project_files\\CMS_Zzw\\upload\\jpdl\\4a26b849-1c72-4df5-a4ac-8fb8ffa8e272.jpdl.xml');
INSERT INTO `jbpm4_lob` VALUES ('10002', '0', 0x3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0D0A0D0A3C70726F63657373206B65793D2263617222206E616D653D226361722220786D6C6E733D22687474703A2F2F6A62706D2E6F72672F342E342F6A70646C223E0D0A0D0A0D0A2020203C737461727420673D223139322C302C34382C343822206E616D653D22737461727431223E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D227375626D69742220746F3D226173736573734170706C69636174696F6E222F3E0D0A2020203C2F73746172743E0D0A0D0A0D0A2020203C7461736B20673D223136342C39372C39322C353222206E616D653D226173736573734170706C69636174696F6E223E0D0A2020202020203C61737369676E6D656E742D68616E646C657220636C6173733D22636F6D2E7A7A772E776F726B666C6F772E61737369676E61626C652E41707041737365737341737369676E61626C65223E0D0A2020202020202020203C6669656C64206E616D653D2261737369676E6565526F6C654964223E0D0A2020202020202020202020203C737472696E672076616C75653D2234222F3E0D0A2020202020202020203C2F6669656C643E0D0A2020202020203C2F61737369676E6D656E742D68616E646C65723E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D22706173732220746F3D22636172222F3E0D0A2020203C2F7461736B3E0D0A0D0A2020203C7461736B2061737369676E65653D22247B6170706C6963616E747D2220673D223136332C3139372C39322C353222206E616D653D22636172223E0D0A0D0A2020202020203C7472616E736974696F6E20673D222D37322C2D323222206E616D653D2263686F6F7365206361722220746F3D227265676973746572436172222F3E0D0A2020203C2F7461736B3E0D0A2020203C7461736B20673D223135372C3238312C38302C343022206E616D653D227265676973746572436172223E0D0A2020202020203C61737369676E6D656E742D68616E646C657220636C6173733D22636F6D2E7A7A772E776F726B666C6F772E61737369676E61626C652E41707041737365737341737369676E61626C65223E0D0A2020202020202020203C6669656C64206E616D653D2261737369676E6565526F6C654964223E0D0A2020202020202020202020203C737472696E672076616C75653D2234222F3E0D0A2020202020202020203C2F6669656C643E0D0A2020202020203C2F61737369676E6D656E742D68616E646C65723E0D0A2020202020203C7472616E736974696F6E20673D222D34362C2D313122206E616D653D227061737352656769737465722220746F3D22656E6431222F3E0D0A2020202020203C7472616E736974696F6E20673D223337302C3236363A2D33372C2D323222206E616D653D2272656A6563742220746F3D22636172222F3E0D0A2020203C2F7461736B3E0D0A0D0A2020203C656E6420673D223136332C3336392C34382C343822206E616D653D22656E6431222F3E0D0A3C2F70726F636573733E, '10001', 'E:\\developEnvironment\\project_files\\CMS_Zzw\\upload\\jpdl\\3089b8b1-1bce-4ae1-8090-e4ac47d05075.jpdl.xml');
INSERT INTO `jbpm4_lob` VALUES ('90002', '0', 0x3C3F786D6C2076657273696F6E3D22312E302220656E636F64696E673D225554462D38223F3E0D0A0D0A3C70726F63657373206B65793D2263617222206E616D653D226361722220786D6C6E733D22687474703A2F2F6A62706D2E6F72672F342E342F6A70646C223E0D0A0D0A0D0A2020203C737461727420673D223139322C302C34382C343822206E616D653D22737461727431223E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D227375626D69742220746F3D226173736573734170706C69636174696F6E222F3E0D0A2020203C2F73746172743E0D0A0D0A0D0A2020203C7461736B20673D223136342C39372C39322C353222206E616D653D226173736573734170706C69636174696F6E223E0D0A2020202020203C61737369676E6D656E742D68616E646C657220636C6173733D22636F6D2E7A7A772E776F726B666C6F772E61737369676E61626C652E41707041737365737341737369676E61626C65223E0D0A2020202020202020203C6669656C64206E616D653D2261737369676E6565526F6C654964223E0D0A2020202020202020202020203C737472696E672076616C75653D2234222F3E0D0A2020202020202020203C2F6669656C643E0D0A2020202020203C2F61737369676E6D656E742D68616E646C65723E0D0A2020202020203C7472616E736974696F6E20673D222D35322C2D323222206E616D653D22706173732220746F3D22636172222F3E0D0A2020203C2F7461736B3E0D0A0D0A2020203C7461736B2061737369676E65653D22247B6170706C6963616E747D2220673D223136332C3139372C39322C353222206E616D653D22636172223E0D0A0D0A2020202020203C7472616E736974696F6E20673D222D37322C2D323222206E616D653D2263686F6F7365206361722220746F3D227265676973746572436172222F3E0D0A2020203C2F7461736B3E0D0A2020203C7461736B20673D223135372C3238312C38302C343022206E616D653D227265676973746572436172223E0D0A2020202020203C61737369676E6D656E742D68616E646C657220636C6173733D22636F6D2E7A7A772E776F726B666C6F772E61737369676E61626C652E41707041737365737341737369676E61626C65223E0D0A2020202020202020203C6669656C64206E616D653D2261737369676E6565526F6C654964223E0D0A2020202020202020202020203C737472696E672076616C75653D2234222F3E0D0A2020202020202020203C2F6669656C643E0D0A2020202020203C2F61737369676E6D656E742D68616E646C65723E0D0A2020202020203C7472616E736974696F6E20673D222D34362C2D313122206E616D653D227061737352656769737465722220746F3D22656E6431222F3E0D0A2020202020203C7472616E736974696F6E20673D223337302C3236363A2D33372C2D323222206E616D653D2272656A6563742220746F3D22636172222F3E0D0A2020203C2F7461736B3E0D0A0D0A2020203C656E6420673D223136332C3336392C34382C343822206E616D653D22656E6431222F3E0D0A3C2F70726F636573733E, '90001', 'E:\\developEnvironment\\project_files\\CMS_Zzw\\upload\\jpdl\\3089b8b1-1bce-4ae1-8090-e4ac47d05075.jpdl.xml');

-- ----------------------------
-- Table structure for jbpm4_participation
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_participation`;
CREATE TABLE `jbpm4_participation` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `GROUPID_` varchar(255) DEFAULT NULL,
  `USERID_` varchar(255) DEFAULT NULL,
  `TYPE_` varchar(255) DEFAULT NULL,
  `TASK_` bigint(20) DEFAULT NULL,
  `SWIMLANE_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_PART_SWIMLANE` (`SWIMLANE_`),
  KEY `FK_PART_TASK` (`TASK_`),
  CONSTRAINT `FK_PART_SWIMLANE` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`),
  CONSTRAINT `FK_PART_TASK` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_participation
-- ----------------------------
INSERT INTO `jbpm4_participation` VALUES ('130005', '0', null, '1', 'candidate', '130004', null);

-- ----------------------------
-- Table structure for jbpm4_property
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_property`;
CREATE TABLE `jbpm4_property` (
  `KEY_` varchar(255) NOT NULL,
  `VERSION_` int(11) NOT NULL,
  `VALUE_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`KEY_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_property
-- ----------------------------
INSERT INTO `jbpm4_property` VALUES ('next.dbid', '14', '140001');

-- ----------------------------
-- Table structure for jbpm4_swimlane
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_swimlane`;
CREATE TABLE `jbpm4_swimlane` (
  `DBID_` bigint(20) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_SWIMLANE_EXEC` (`EXECUTION_`),
  CONSTRAINT `FK_SWIMLANE_EXEC` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_swimlane
-- ----------------------------

-- ----------------------------
-- Table structure for jbpm4_task
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_task`;
CREATE TABLE `jbpm4_task` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` char(1) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `NAME_` varchar(255) DEFAULT NULL,
  `DESCR_` text,
  `STATE_` varchar(255) DEFAULT NULL,
  `SUSPHISTSTATE_` varchar(255) DEFAULT NULL,
  `ASSIGNEE_` varchar(255) DEFAULT NULL,
  `FORM_` varchar(255) DEFAULT NULL,
  `PRIORITY_` int(11) DEFAULT NULL,
  `CREATE_` datetime DEFAULT NULL,
  `DUEDATE_` datetime DEFAULT NULL,
  `PROGRESS_` int(11) DEFAULT NULL,
  `SIGNALLING_` bit(1) DEFAULT NULL,
  `EXECUTION_ID_` varchar(255) DEFAULT NULL,
  `ACTIVITY_NAME_` varchar(255) DEFAULT NULL,
  `HASVARS_` bit(1) DEFAULT NULL,
  `SUPERTASK_` bigint(20) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `PROCINST_` bigint(20) DEFAULT NULL,
  `SWIMLANE_` bigint(20) DEFAULT NULL,
  `TASKDEFNAME_` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_TASK_SWIML` (`SWIMLANE_`),
  KEY `FK_TASK_SUPERTASK` (`SUPERTASK_`),
  CONSTRAINT `FK_TASK_SUPERTASK` FOREIGN KEY (`SUPERTASK_`) REFERENCES `jbpm4_task` (`DBID_`),
  CONSTRAINT `FK_TASK_SWIML` FOREIGN KEY (`SWIMLANE_`) REFERENCES `jbpm4_swimlane` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_task
-- ----------------------------
INSERT INTO `jbpm4_task` VALUES ('110002', 'T', '1', 'car', null, 'open', null, '1', null, '0', '2015-12-16 13:48:22', null, null, '', 'car.80022', 'car', '\0', null, '80022', '80022', null, 'car');
INSERT INTO `jbpm4_task` VALUES ('120007', 'T', '1', 'car', null, 'open', null, '1', null, '0', '2015-12-16 15:09:45', null, null, '', 'car.80015', 'car', '\0', null, '80015', '80015', null, 'car');
INSERT INTO `jbpm4_task` VALUES ('130004', 'T', '1', 'registerCar', null, 'open', null, null, null, '0', '2015-12-17 15:33:38', null, null, '', 'car.80008', 'registerCar', '\0', null, '80008', '80008', null, 'registerCar');

-- ----------------------------
-- Table structure for jbpm4_variable
-- ----------------------------
DROP TABLE IF EXISTS `jbpm4_variable`;
CREATE TABLE `jbpm4_variable` (
  `DBID_` bigint(20) NOT NULL,
  `CLASS_` varchar(255) NOT NULL,
  `DBVERSION_` int(11) NOT NULL,
  `KEY_` varchar(255) DEFAULT NULL,
  `CONVERTER_` varchar(255) DEFAULT NULL,
  `HIST_` bit(1) DEFAULT NULL,
  `EXECUTION_` bigint(20) DEFAULT NULL,
  `TASK_` bigint(20) DEFAULT NULL,
  `LOB_` bigint(20) DEFAULT NULL,
  `DATE_VALUE_` datetime DEFAULT NULL,
  `DOUBLE_VALUE_` double DEFAULT NULL,
  `CLASSNAME_` varchar(255) DEFAULT NULL,
  `LONG_VALUE_` bigint(20) DEFAULT NULL,
  `STRING_VALUE_` varchar(255) DEFAULT NULL,
  `TEXT_VALUE_` text,
  `EXESYS_` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`DBID_`),
  KEY `FK_VAR_EXESYS` (`EXESYS_`),
  KEY `FK_VAR_LOB` (`LOB_`),
  KEY `FK_VAR_TASK` (`TASK_`),
  KEY `FK_VAR_EXECUTION` (`EXECUTION_`),
  CONSTRAINT `FK_VAR_EXECUTION` FOREIGN KEY (`EXECUTION_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_VAR_EXESYS` FOREIGN KEY (`EXESYS_`) REFERENCES `jbpm4_execution` (`DBID_`),
  CONSTRAINT `FK_VAR_LOB` FOREIGN KEY (`LOB_`) REFERENCES `jbpm4_lob` (`DBID_`),
  CONSTRAINT `FK_VAR_TASK` FOREIGN KEY (`TASK_`) REFERENCES `jbpm4_task` (`DBID_`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jbpm4_variable
-- ----------------------------
INSERT INTO `jbpm4_variable` VALUES ('80009', 'string', '0', 'modelName', null, '\0', '80008', null, null, null, null, null, null, 'com.zzw.vo.ZApplication', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80010', 'string', '0', 'applicant', null, '\0', '80008', null, null, null, null, null, null, '1', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80011', 'string', '0', 'businessId', null, '\0', '80008', null, null, null, null, null, null, '8a8385bf51a344020151a355b48e0002', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80016', 'string', '0', 'modelName', null, '\0', '80015', null, null, null, null, null, null, 'com.zzw.vo.ZApplication', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80017', 'string', '0', 'applicant', null, '\0', '80015', null, null, null, null, null, null, '1', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80018', 'string', '0', 'businessId', null, '\0', '80015', null, null, null, null, null, null, '8a8385bf51a344020151a35e3b950003', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80023', 'string', '0', 'modelName', null, '\0', '80022', null, null, null, null, null, null, 'com.zzw.vo.ZApplication', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80024', 'string', '0', 'applicant', null, '\0', '80022', null, null, null, null, null, null, '1', null, null);
INSERT INTO `jbpm4_variable` VALUES ('80025', 'string', '0', 'businessId', null, '\0', '80022', null, null, null, null, null, null, '8a8385bf51a344020151a36197f60004', null, null);

-- ----------------------------
-- Table structure for user_job
-- ----------------------------
DROP TABLE IF EXISTS `user_job`;
CREATE TABLE `user_job` (
  `user_id` varchar(40) NOT NULL,
  `job_id` varchar(40) NOT NULL,
  PRIMARY KEY (`user_id`,`job_id`),
  KEY `FKF022D94927104803` (`user_id`),
  KEY `FKF022D94972642551` (`job_id`),
  CONSTRAINT `FKF022D94927104803` FOREIGN KEY (`user_id`) REFERENCES `zuser` (`id`),
  CONSTRAINT `FKF022D94972642551` FOREIGN KEY (`job_id`) REFERENCES `zjob` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_job
-- ----------------------------
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b276dfa0001');
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b278da20006');
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b27c995000b');
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b27c995000c');
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b27c995000d');
INSERT INTO `user_job` VALUES ('1', '40288100516b235901516b27c995000e');
INSERT INTO `user_job` VALUES ('1', '40288100517b4e6301517bb393fe0003');
INSERT INTO `user_job` VALUES ('1', '8a83853b517f68d001517f6e76e80001');
INSERT INTO `user_job` VALUES ('1', '8a83853b517f68d001517f6f13030002');
INSERT INTO `user_job` VALUES ('1', '8a83853b517f68d001517f6f13030003');
INSERT INTO `user_job` VALUES ('8a8385bb515c9dab01515ca4c4570002', '40288100516b235901516b278da20007');
INSERT INTO `user_job` VALUES ('8a8385bb515c9dab01515ca4c4570002', '40288100516b235901516b278da2000a');
INSERT INTO `user_job` VALUES ('8a8385bb515c9dab01515ca4c4570002', '40288100517b4e6301517bb393fe0003');

-- ----------------------------
-- Table structure for wfdeployment
-- ----------------------------
DROP TABLE IF EXISTS `wfdeployment`;
CREATE TABLE `wfdeployment` (
  `id` varchar(40) NOT NULL,
  `createDept` varchar(255) DEFAULT NULL,
  `createDeptCode` varchar(255) DEFAULT NULL,
  `createTime` varchar(255) DEFAULT NULL,
  `createUser` varchar(255) DEFAULT NULL,
  `createUserCode` varchar(255) DEFAULT NULL,
  `pdId` varchar(255) DEFAULT NULL,
  `piId` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `deployId` varchar(50) DEFAULT NULL,
  `descript` text,
  `fileName` varchar(255) DEFAULT NULL,
  `filePath` varchar(255) DEFAULT NULL,
  `photoPath` varchar(255) DEFAULT NULL,
  `processDefinitionId` varchar(50) DEFAULT NULL,
  `processKey` varchar(50) DEFAULT NULL,
  `processName` varchar(255) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wfdeployment
-- ----------------------------
INSERT INTO `wfdeployment` VALUES ('8a838583506449cd0150644cc9230001', null, null, '2015-10-14', 'admin', null, 'app-1', null, '1', '1', 'app cms zzw', 'app.jpdl.xml', '/jpdl/4a26b849-1c72-4df5-a4ac-8fb8ffa8e272.jpdl.xml', '/jpdl/4a26b849-1c72-4df5-a4ac-8fb8ffa8e272.png', 'app-1', 'app', 'app cms zzw', '1');
INSERT INTO `wfdeployment` VALUES ('ff80808151894eda0151895bc6e30001', null, null, '2015-12-10', 'admin', null, 'car-2', null, '1', '90001', '申请买车', 'car.jpdl.xml', '/jpdl/3089b8b1-1bce-4ae1-8090-e4ac47d05075.jpdl.xml', '/jpdl/3089b8b1-1bce-4ae1-8090-e4ac47d05075.png', 'car-2', 'car', 'buy car', '2');

-- ----------------------------
-- Table structure for wfprocessmount
-- ----------------------------
DROP TABLE IF EXISTS `wfprocessmount`;
CREATE TABLE `wfprocessmount` (
  `id` varchar(50) NOT NULL,
  `businessId` varchar(255) DEFAULT NULL,
  `businessUrl` varchar(255) DEFAULT NULL,
  `departmentCode` varchar(255) DEFAULT NULL,
  `mountStatus` varchar(255) DEFAULT NULL COMMENT '1 已挂接  0 未挂接',
  `updateTime` datetime DEFAULT NULL,
  `updateUser` varchar(255) DEFAULT NULL,
  `deployment_id` varchar(40) DEFAULT NULL,
  `updateUser_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK79CF7B59307EE63A` (`deployment_id`),
  KEY `FK79CF7B596AAD4B1A` (`updateUser_id`),
  KEY `FK79CF7B591E40F208` (`updateUser`),
  CONSTRAINT `FK21231231` FOREIGN KEY (`updateUser`) REFERENCES `zuser` (`usercode`),
  CONSTRAINT `FK79CF7B591E40F208` FOREIGN KEY (`updateUser`) REFERENCES `zuser` (`usercode`),
  CONSTRAINT `FK79CF7B59307EE63A` FOREIGN KEY (`deployment_id`) REFERENCES `wfdeployment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wfprocessmount
-- ----------------------------
INSERT INTO `wfprocessmount` VALUES ('8a838586506fa99a01506fac5bf30001', null, null, null, '1', '2015-10-16 16:02:58', 'admin', '8a838583506449cd0150644cc9230001', null);
INSERT INTO `wfprocessmount` VALUES ('ff80808151894eda0151895c48850002', null, null, null, '1', '2015-12-15 13:50:54', 'admin', 'ff80808151894eda0151895bc6e30001', null);

-- ----------------------------
-- Table structure for zapplication
-- ----------------------------
DROP TABLE IF EXISTS `zapplication`;
CREATE TABLE `zapplication` (
  `id` varchar(50) NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `money` varchar(40) DEFAULT NULL,
  `plateNumber` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `vehicleType` varchar(255) DEFAULT NULL,
  `user_id` varchar(40) DEFAULT NULL,
  `processInstanceId` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7481D09627104803` (`user_id`),
  CONSTRAINT `FK7481D09627104803` FOREIGN KEY (`user_id`) REFERENCES `zuser` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zapplication
-- ----------------------------
INSERT INTO `zapplication` VALUES ('402881ff519dea6001519dee216b0001', '2015-12-14 08:40:08', '5', '津HC0876', '123231', '0', '宝马', '1', 'car.60001', '0');
INSERT INTO `zapplication` VALUES ('8a8385bf51a344020151a35402cc0001', '2015-12-15 09:49:31', '80000', '津HC0876', '德玛西亚', '0', '雪佛兰', '1', 'car.80001', '0');
INSERT INTO `zapplication` VALUES ('8a8385bf51a344020151a355b48e0002', '2015-12-15 09:51:22', '52010', '津C52017', '爱是你我', '2', '大众一汽', '1', 'car.80008', '1');
INSERT INTO `zapplication` VALUES ('8a8385bf51a344020151a35e3b950003', '2015-12-15 10:00:41', '222', '津AK4729', '霸气不漏', '1', '宝马', '1', 'car.80015', '1');
INSERT INTO `zapplication` VALUES ('8a8385bf51a344020151a36197f60004', '2015-12-15 10:04:21', '22', '津A', 'nonono', '1', '夏利', '1', 'car.80022', '1');

-- ----------------------------
-- Table structure for zdepartment
-- ----------------------------
DROP TABLE IF EXISTS `zdepartment`;
CREATE TABLE `zdepartment` (
  `id` varchar(40) NOT NULL,
  `code` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `zid` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1C6F74C1A0385D0` (`zid`),
  CONSTRAINT `FK1C6F74C1A0385D0` FOREIGN KEY (`zid`) REFERENCES `zdepartment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zdepartment
-- ----------------------------
INSERT INTO `zdepartment` VALUES ('1', '001', 'Zzw', null);
INSERT INTO `zdepartment` VALUES ('2', '1111', '管理部', '1');
INSERT INTO `zdepartment` VALUES ('3', '222', '教学部伤心的理由', '1');
INSERT INTO `zdepartment` VALUES ('4', '004', '外交部', '1');
INSERT INTO `zdepartment` VALUES ('8a83858550a3222e0150a33e1d4a0004', 'korea', 'running man', '2');

-- ----------------------------
-- Table structure for zjob
-- ----------------------------
DROP TABLE IF EXISTS `zjob`;
CREATE TABLE `zjob` (
  `id` varchar(40) NOT NULL,
  `department_id` varchar(40) DEFAULT NULL,
  `role_id` varchar(40) DEFAULT NULL,
  `checked` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK2A0D03534F43E3` (`department_id`),
  KEY `FK2A0D0381E58423` (`role_id`),
  CONSTRAINT `FK2A0D03534F43E3` FOREIGN KEY (`department_id`) REFERENCES `zdepartment` (`id`),
  CONSTRAINT `FK2A0D0381E58423` FOREIGN KEY (`role_id`) REFERENCES `zrole` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zjob
-- ----------------------------
INSERT INTO `zjob` VALUES ('40288100516716580151671a07ba0002', '3', '4', '0');
INSERT INTO `zjob` VALUES ('40288100516716580151671a07ba0003', '3', '40288100513dcb7a01513dcc0f970001', '0');
INSERT INTO `zjob` VALUES ('40288100516a706201516a74e6640001', '4', '1', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b276dfa0001', '3', '12', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b276dfe0002', '3', '5', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b276dfe0003', '3', '9', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b276dfe0005', '3', '11', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b278da20006', '4', '10', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b278da20007', '4', '9', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b278da20009', '4', '6', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b278da2000a', '4', '5', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b27c995000b', '8a83858550a3222e0150a33e1d4a0004', '5', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b27c995000c', '8a83858550a3222e0150a33e1d4a0004', '6', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b27c995000d', '8a83858550a3222e0150a33e1d4a0004', '8', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b27c995000e', '8a83858550a3222e0150a33e1d4a0004', '9', '0');
INSERT INTO `zjob` VALUES ('40288100516b235901516b27c995000f', '8a83858550a3222e0150a33e1d4a0004', '10', '0');
INSERT INTO `zjob` VALUES ('40288100516b4ad201516b50f7840001', '3', '8', '0');
INSERT INTO `zjob` VALUES ('40288100517b4e6301517bb30e5a0001', '4', '11', '0');
INSERT INTO `zjob` VALUES ('40288100517b4e6301517bb30e7e0002', '4', '40288100513dcb7a01513dcc0f970001', '0');
INSERT INTO `zjob` VALUES ('40288100517b4e6301517bb393fe0003', '4', '12', '0');
INSERT INTO `zjob` VALUES ('8a83853b517f68d001517f6e76e80001', '4', '8', '0');
INSERT INTO `zjob` VALUES ('8a83853b517f68d001517f6f13030002', '8a83858550a3222e0150a33e1d4a0004', '11', '0');
INSERT INTO `zjob` VALUES ('8a83853b517f68d001517f6f13030003', '8a83858550a3222e0150a33e1d4a0004', '4', '0');
INSERT INTO `zjob` VALUES ('8a8385a451a850d10151a87012790002', '8a83858550a3222e0150a33e1d4a0004', '8a8385a451a850d10151a86fdeb70001', '0');

-- ----------------------------
-- Table structure for zrole
-- ----------------------------
DROP TABLE IF EXISTS `zrole`;
CREATE TABLE `zrole` (
  `id` varchar(40) NOT NULL,
  `code` varchar(40) DEFAULT NULL,
  `name` varchar(40) DEFAULT NULL,
  `checked` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zrole
-- ----------------------------
INSERT INTO `zrole` VALUES ('1', '001', '高级管理员', null);
INSERT INTO `zrole` VALUES ('10', '011', 'gary', null);
INSERT INTO `zrole` VALUES ('11', '012', '池锡辰', null);
INSERT INTO `zrole` VALUES ('12', '013', 'CY', null);
INSERT INTO `zrole` VALUES ('2', '0037', '管理员', null);
INSERT INTO `zrole` VALUES ('4', '005', 'haha', null);
INSERT INTO `zrole` VALUES ('40288100513dcb7a01513dcc0f970001', '321321', 'banna', '0');
INSERT INTO `zrole` VALUES ('5', '006', '刘在石', null);
INSERT INTO `zrole` VALUES ('6', '007', '李光洙', null);
INSERT INTO `zrole` VALUES ('8', '009', '金钟国', null);
INSERT INTO `zrole` VALUES ('8a8385a451a850d10151a86fdeb70001', '222', '学霸', '0');
INSERT INTO `zrole` VALUES ('9', '010', '宋智孝', null);

-- ----------------------------
-- Table structure for zuser
-- ----------------------------
DROP TABLE IF EXISTS `zuser`;
CREATE TABLE `zuser` (
  `id` varchar(40) NOT NULL,
  `password` varchar(40) DEFAULT NULL,
  `usercode` varchar(255) DEFAULT NULL,
  `username` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usercode` (`usercode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of zuser
-- ----------------------------
INSERT INTO `zuser` VALUES ('1', 'admin', 'admin', 'admin');
INSERT INTO `zuser` VALUES ('8a8385bb515c9dab01515ca0548f0001', null, '3123121', '32');
INSERT INTO `zuser` VALUES ('8a8385bb515c9dab01515ca4c4570002', '123456', '3333', 'k22333');
