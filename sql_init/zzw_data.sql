-- ----------------------------
-- Records of user_job
-- ----------------------------
INSERT INTO `user_job` VALUES ('1', '1');
INSERT INTO `user_job` VALUES ('1', '5');
-- ----------------------------
-- Records of zdepartment
-- ----------------------------
INSERT INTO `zdepartment` VALUES ('1', '001', 'Zzw', null);
INSERT INTO `zdepartment` VALUES ('2', '002', '管理部', '1');
INSERT INTO `zdepartment` VALUES ('3', '003', '教学部', '1');
INSERT INTO `zdepartment` VALUES ('4', '004', '外交部', '1');
-- ----------------------------
-- Records of zjob
-- ----------------------------
INSERT INTO `zjob` VALUES ('1', '3', '2');
INSERT INTO `zjob` VALUES ('2', '2', '2');
INSERT INTO `zjob` VALUES ('3', '4', '2');
INSERT INTO `zjob` VALUES ('4', '2', '3');
INSERT INTO `zjob` VALUES ('5', '3', '3');
-- ----------------------------
-- Records of zrole
-- ----------------------------
INSERT INTO `zrole` VALUES ('1', '001', '高级管理员');
INSERT INTO `zrole` VALUES ('2', '003', '管理员');
INSERT INTO `zrole` VALUES ('3', '004', '工作人员');
-- ----------------------------
-- Records of zuser
-- ----------------------------
INSERT INTO `zuser` VALUES ('1', 'admin', 'admin', 'admin');