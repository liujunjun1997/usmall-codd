<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="80px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" label-width="80px">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            :default-checked-keys="defaultKey"
            :props="defaultProps"
            ref="tree"
          ></el-tree>
        </el-form-item>
        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  requestRoleAdd,
  requestRoleDetail,
  requestRoleUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props:["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      defaultKey: [],
      //树形结构的数据
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  mounted() {
    if (this.menuList.length === 0) {
      this.requestMenuList();
    }
  },
  methods: {
    ...mapActions({
      requestMenuList: "menu/requestList",
      requestRoleList: "role/requestList",
    }),
    //置空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };

      this.$refs.tree.setCheckedKeys([]);
    },

    //取消
    cancel() {
      this.info.show = false;
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //添加
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      requestRoleAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.list);
          this.empty();
          this.cancel();
          this.requestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    //获取一条数据
    getDetail(id) {
      //ajax
      requestRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.defaultKey=JSON.parse(res.data.list.menus);
      });
    },
    //点击修改
    update(){
        this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
        requestRoleUpdate(this.form).then((res)=>{
            if(res.data.code==200){
                successAlert("修改成功");
                this.empty();
                this.cancel();
                this.requestRoleList();
            }else{
                warningAlert(res.data.msg);
            }
        });
    },
  },
};
</script>

<style>
</style>