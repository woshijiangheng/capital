<template>
   <div>
       
  <div class="time">
            <el-form
                :inline="true"
                ref="search_data"
                 :model="search_data"
                >
                <el-form-item label="投标时间筛选:">
                    <el-date-picker
                        v-model="search_data.startTime"
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                       v-model="search_data.endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search" @click='handlsearch()'>筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button v-if="user.identity=='manager'" type="primary" size ="small" icon="view" @click="dialogVisible = true">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
       
<el-card>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type='index'> </el-table-column>
    <el-table-column  label="创建时间"  align='center' > 
      <template v-slot='scope'>
       {{scope.row.date|datrfmt('YYYY-MM-DD')}}
      </template>
    </el-table-column>
    <el-table-column prop="type" label="收支类型" width='140' align='center' > </el-table-column>
    <el-table-column prop="describe" label="收支描述" width='140'  align='center'> </el-table-column>
    <el-table-column prop="income" label="收入" width='140'  align='center'> </el-table-column>
    <el-table-column prop="expend" label="支出" width='140'  align='center'> </el-table-column>
    <el-table-column prop="cash" label="账户现金" width='140'  align='center'> </el-table-column>
    <el-table-column prop="remark" label="备注" width='140'  align='center'> </el-table-column>
    <el-table-column  label="操作"  align='center'>
        <template v-slot='scope'>
        <el-button  v-if="user.identity=='manager'" type="primary" icon="el-icon-edit" circle style="margin-left:20px" @click="updatelist(scope.row._id)" ></el-button>
        <el-button  v-if="user.identity=='manager'" type="danger" icon="el-icon-delete" circle style="margin-left:40px" @click="remove(scope.row._id)"></el-button>
           
        </template> </el-table-column>







  
  </el-table>



</el-card>
<!-- 添加区域 -->
<el-dialog
  title="添加资金信息"
  :visible.sync="dialogVisible"
  >
 <div class="form">
                <el-form 
                    ref="form" 
                    :model="form"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="收支类型:" >
                        <el-select v-model="form.type" placeholder="收支类型">
                            <el-option
                             v-for="(formtype, index) in format_type_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='describe' label="收支描述:">
                        <el-input type="describe" v-model="form.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='income'  label="收入:">
                        <el-input type="income" v-model="form.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='expend' label="支出:">
                        <el-input type="expend" v-model="form.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop='cash' label="账户现金:">
                        <el-input type="cash" v-model="form.cash"></el-input>
                    </el-form-item>

                     <el-form-item label="备注:">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>


                </el-form>
            </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addlist">确 定</el-button>
  </span>
</el-dialog>
<!-- 编辑 -->
<el-dialog
  title="修改资金信息"
  :visible.sync="editdialogVisible"
  >
 <div class="form">
                <el-form 
                    ref="editform" 
                    :model="editform"
                    :rules="form_rules"
                    label-width="120px" 
                    style="margin:10px;width:auto;">

                    <el-form-item label="收支类型:" >
                        <el-select v-model="editform.type" placeholder="收支类型">
                            <el-option
                             v-for="(formtype, index) in format_type_list"
                             :key="index" 
                             :label="formtype" :value="formtype"
                            ></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item prop='describe' label="收支描述:">
                        <el-input type="describe" v-model="editform.describe"></el-input>
                    </el-form-item>

                    <el-form-item prop='income'  label="收入:">
                        <el-input type="income" v-model="editform.income"></el-input>
                    </el-form-item>

                    <el-form-item prop='expend' label="支出:">
                        <el-input type="expend" v-model="editform.expend"></el-input>
                    </el-form-item>

                    <el-form-item prop='cash' label="账户现金:">
                        <el-input type="cash" v-model="editform.cash"></el-input>
                    </el-form-item>

                     <el-form-item label="备注:">
                        <el-input type="textarea" v-model="editform.remark"></el-input>
                    </el-form-item>


                </el-form>
            </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editdialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editlist">确 定</el-button>
  </span>
</el-dialog>


<!-- 分页 -->

 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginations.page_index"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="paginations.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total=paginations.total>
    </el-pagination>        
   </div>
</template>
 <script>
 export default {
     data(){
         return{
           search_data:{
             startTime:'',
             endTime:''
           },
           filterTable:[],
             //数据列表
             tableData:[],
             dialogVisible:false,
             editdialogVisible:false,
             editform:{},
             allTableData:[],
             
              paginations: {
         page_index: 1, // 当前位于哪页
        total: 0, // 总数
        page_size: 5, // 1页显示多少条
        },
             form:{
                 
                 type:'',
                 describe:'',
                 income:'',
                 expend:'',
                 cash:'',
                 remark:'',
                  },
             format_type_list:[
            "提现",
             "生活用品",
            "充值",
            "优惠券",
            "充值礼券",
            "转账",
            
             ],
             form_rules: {
        describe: [
          { required: true, message: "收支描述不能为空！", trigger: "blur" }
        ],
        income: [
          { required: true, message: "收入不能为空！", trigger: "blur" }
        ],
        expend: [
          { required: true, message: "支出不能为空！", trigger: "blur" }
        ],
        cash: [{ required: true, message: "账户不能为空！", trigger: "blur" }]
      }
         }
     },
     created() {
         this.getTableList()
     },
    methods: {
      async  getTableList(){
         let{data}=await this.$axios.get("profiles/find")
            this.tableData=data
            this.allTableData=data
            this.filterTable=data
            this.paginations.total=this.tableData.length
             console.log(this.tableData);
             
              
         },
        //  添加
       async  addlist(){
         this.$refs.form.validate(async valid=>{
             if(valid){
                let{data}=await this.$axios.post("profiles/add",this.form)
                this.$message.success('添加成功')
            
                this.getTableList()
                    this.dialogVisible =false
                 
             }
         })
       },
        async updatelist(id){
            console.log(id);
            
let{data}=await this.$axios.get(`profiles/${id}`)
               this.editform=data
console.log(this.editform);


           this.editdialogVisible =true
       },
       //修改
       async  editlist(){
         this.$refs.editform.validate(async valid=>{
             if(valid){
                let{data}=await this.$axios.post(`profiles/edit/${this.editform._id}`,this.editform)
                this.$message.success('修改成功')
            
                this.getTableList()
                    this.editdialogVisible =false
                 
             }
         })
       },

      async remove(id){
          console.log(id);
          
                let{data}=await this.$axios.delete(`profiles/remove/${id}`)
                this.$message.success('删除成功')
            
                this.getTableList()
                    
                 
             
         },
        handleCurrentChange(page) {
      // 当前页
      let sortnum = this.paginations.page_size * (page - 1);
      let table = this.allTableData.filter((item, index) => {
        return index >= sortnum;
      });
      // 设置默认分页数据
      this.tableData = table.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    handleSizeChange(page_size) {
      // 切换size
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPaginations() {
      // 总页数
      this.paginations.total = this.allTableData.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 5;
      // 设置默认分页数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.page_size;
      });
    },
    // 筛选功能
    handlsearch(){
      if(!this.search_data.startTime||!this.search_data.endTime){
        this.$message.error('请选择区间')
         this.getProfile()
         return
      }
      const stime = this.search_data.startTime.getTime();
      const etime = this.search_data.endTime.getTime();
      this.allTableData = this.filterTable.filter(item => {
       console.log(item);
       
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= stime && time <= etime;
      
     })
      this.setPaginations()
    }
        
        
     },
     computed: {
       user(){
         return this.$store.getters.user;
       }
     },

 }
 </script>
 <style  scoped>
 .el-table{
     text-align: center;
 }
.time{
    
    margin: 20px 0 10px 0;
}
 </style>
