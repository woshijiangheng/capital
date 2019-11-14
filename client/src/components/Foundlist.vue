<template>
   <div>
       
  <div class="time">
            <el-form
                :inline="true"
                ref="search_data" 
                >
                <el-form-item label="投标时间筛选:">
                    <el-date-picker
                        
                        type="datetime"
                        placeholder="选择开始时间">
                    </el-date-picker> --
                    <el-date-picker
                       
                        type="datetime"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size ="small" icon="search">筛选</el-button>
                </el-form-item>
                 <el-form-item class="btnRight">
                    <el-button type="primary" size ="small" icon="view" >添加</el-button>
                </el-form-item>
            </el-form>
        </div>
       
<el-card>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column type='index'> </el-table-column>
    <el-table-column prop="date" label="创建时间" > </el-table-column>
    <el-table-column prop="type" label="收支类型" width='140'  > </el-table-column>
    <el-table-column prop="describe" label="收支描述" width='140' > </el-table-column>
    <el-table-column prop="income" label="收入" width='140' > </el-table-column>
    <el-table-column prop="expend" label="支出" width='140' > </el-table-column>
    <el-table-column prop="cash" label="账户现金" width='140' > </el-table-column>
    <el-table-column prop="remark" label="备注" width='140' > </el-table-column>
    <el-table-column  label="操作" >
        <template v-slot='scope'>
            {{scope.row}}
        </template> </el-table-column>







  
  </el-table>



</el-card>

        
   </div>
</template>
 <script>
 export default {
     data(){
         return{
             //数据列表
             tableData:[]
         }
     },
     created() {
         this.getTableList()
     },
    methods: {
      async  getTableList(){
         let{data}=await this.$axios.get("profiles/find")
            this.tableData=data
             console.log(this.tableData);
             
              
         }
     },
 }
 </script>
 <style  scoped>
.time{
    margin: 20px 0 10px 0;
}
 </style>
