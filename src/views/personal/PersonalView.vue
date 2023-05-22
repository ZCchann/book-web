<template>
  <div class="user-form">
    <el-card class="user-form-card">
      <el-form :model="form" label-width="120px">
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="form.username"/>
          </el-form-item>
        </el-col>
        <el-form-item label="更改密码 ">
          <el-button type="primary" size="large" @click="open_reset_mail">更改密码</el-button>
        </el-form-item>
        <el-col :span="8">
          <el-form-item label="邮箱">
            <el-input v-model="form.email"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button @click="save">保存</el-button>
        </el-col>
      </el-form>
    </el-card>
  </div>

  <div class="reset-mail-drawer">
    <el-drawer v-model="reset_mail_drawer" :direction="direction">
      <el-form-item label="当前邮箱">
        <el-input disabled v-model="form.email"/>
        <el-button type="primary" size="large" @click="getCode">获取验证码</el-button>
      </el-form-item>

      <el-form-item prop="number" label="请输入验证码" :rules="[
            {
              required: true,
              message: '请输入验证码',
              trigger: 'blur',
            },
            {
              type: 'number',
              message: '请输入验证码',
              trigger: ['blur', 'change'],
            },
          ]">
        <el-input :disabled="reset_mail_input_disabled" v-model="form.code"/>
      </el-form-item>

      <el-form-item prop="email" label="请输入新邮箱地址" :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change'],
            },
          ]" >
        <el-input v-model="form.new_email" />
      </el-form-item>

      <el-button type="primary" size="large" @click="reset_mail_submit">提交</el-button>
    </el-drawer>
  </div>


  <div class="user-address">
    <el-card class="user-address">
      <el-form :model="addressForm" ref="form" label-width="120px">
        <el-col :span="8">
          <el-form-item prop="addressee"
                        label="收件人"
                        :rules="[{
              required: true,
              message: '请输入收件人',
              trigger: 'blur',
            }] "
          >
            <el-input v-model=" addressForm.addressee" required/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="telephone" label="电话" :rules="[{
              required: true,
              message: '请输入电话',
              trigger: 'blur',
            }] ">
            <el-input v-model="addressForm.telephone"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="address" label="地址">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                filterable
                style="width:100%"
            >
            </el-cascader>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="address" label="详细地址" :rules="[{
              required: true,
              message: '请输入详细地址',
              trigger: 'blur',
            }] ">
            <el-input v-model="addressForm.address"/>
          </el-form-item>

          <el-form-item>
            <el-button type="info" @click="submitAddress">提交</el-button>
          </el-form-item>
        </el-col>


        <el-table :data="addressTable" style="width: 100%" height="352">
          <el-table-column prop="addressee" label="收件人" width="180"/>
          <el-table-column prop="telephone" label="电话" width="180"/>
          <el-table-column prop="address" label="地址"/>
          <el-table-column label="编辑">
            <template #default="scope">
              <el-button size="small" type="primary" @click="tableHandleEdit(scope.row)" :icon="Edit">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row)" :icon="Delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-form>
    </el-card>
  </div>
  <Personal_edit_View
      :visible="formVisible"
      :dataID="dataId"
      :on-Success="getAddress"
      @update:visible="formVisible = $event"

  />
</template>

<script>
import {AddUserAddress, deleteUserAddress, AdminUpdateUser, getOneUserData, getUserAllAddress, updateUser} from "@/api";
import {getStorage} from "@/utils/browser";
import {ElMessage, ElMessageBox} from "element-plus";
import {regionData, CodeToText} from "element-china-area-data";
import {Delete, Edit} from "@element-plus/icons-vue";
import Personal_edit_View from "@/views/personal/_edit.vue";
import {hexPassword} from "@/utils/hex";
import {send_verification_code} from "@/api/util";

export default {
  name: "PersonalView",
  components: {Personal_edit_View},
  computed: {
    Delete() {
      return Delete
    },
    Edit() {
      return Edit
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
      },
      reset_mail_input_disabled: true, // 重置邮箱输入框的禁止输入状态
      showPassword: false,
      addressForm: {
        address_id: undefined,
        addressee: "", //收件人
        address: "",  //地址
        telephone: "" //收件电话
      },
      addressTable: [],
      options: regionData,
      selectedOptions: [],
      formVisible: false,
      dataId: undefined,
      reset_mail_drawer: false, //是否开启抽屉
      direction: "rtl" //抽屉打开方向
    }
  },
  methods: {
    open_reset_mail() {
      this.reset_mail_drawer = !this.reset_mail_drawer
    },
    getCode() {
      send_verification_code(this.form.email)
      ElMessage({
        message: '验证码已发送 请在邮箱内查收 验证码有效期10分钟',
        type: 'success',
      })
      this.reset_mail_input_disabled = false
    },
    reset_mail_submit() {
      updateUser(this.form).then(() => {
        ElMessage({
          type: 'success',
          message: '保存成功',
        })
        this.getData()
        this.reset_mail_drawer = !this.reset_mail_drawer
      }).catch((data) => {
        ElMessage({
          type: 'error',
          message: data.message,
        })
      })
    },
    async getData() {
      let uuid = getStorage('uuid');
      getOneUserData(uuid).then(({data}) => {
        this.form = data
      })
    },
    save() {
      if (this.form.password === "") {
        delete this.form["password"];
      } else {
        this.form.password = hexPassword(this.form.password)
      }
      AdminUpdateUser(this.form).then(() => {
            ElMessage({
              type: 'success',
              message: '保存成功',
            })
            this.getData()
          }
      )
    },
    handleChange() {
      let loc = "";
      for (let i = 0; i < this.selectedOptions.length; i++) {
        loc += CodeToText[this.selectedOptions[i]];
      }
      this.addressForm.address = loc;
    },
    submitAddress() {
      AddUserAddress(this.addressForm).then(() => {
            ElMessage({
              type: 'success',
              message: "地址添加成功",
            })
            this.getAddress();
            this.$refs.form.resetFields();
          }
      )

    },
    async getAddress() {
      getUserAllAddress().then(({data}) => {
        this.addressTable = data
      })
    },
    tableHandleEdit(row) {
      this.formVisible = !this.formVisible;
      this.dataId = row.address_id
    },
    handleDelete(row) {
      ElMessageBox.confirm(
          '确定要删除这条数据?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        deleteUserAddress(row.address_id).then(() => {
          ElMessage({
            type: 'success',
            message: "地址删除成功",
          })
          this.getAddress();
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })


    }

  },
  mounted() {
    this.getData()
    this.getAddress()
  }
}
</script>

<style scoped>

</style>