<template>
  <div>
    <div id="breadcrumb">
      <Breadcrumb>
        <Breadcrumb-item href="/upload">文件管理</Breadcrumb-item>
        <Breadcrumb-item href="/upload">文件上传</Breadcrumb-item>
      </Breadcrumb>
    </div>
  <Upload
    multiple
    type="drag" :on-success="handleSuccess"
    :action="this.uploadHost">
    <div style="padding: 20px 0">
      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
      <p>点击或将文件拖拽到这里上传</p>
    </div>
  </Upload>
    <div>
      <p >{{defaultList}}</p>
    </div>

  </div>
</template>
<style scoped="">
  #breadcrumb{
    text-align: left;
    line-height: 30px;
    margin-bottom: 10px;
  }
</style>
<script>
  export default {
    data(){
      return{
        defaultList:'',
      }
    },
    methods:{
      handleSuccess(response){
          this.defaultList = response.body;
      }
    }
  }
</script>
