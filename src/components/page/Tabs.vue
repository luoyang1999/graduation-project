<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-copy"></i> 文件管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-tabs v-model="message">
        <el-tab-pane :label="`文件列表(${files.length})`" name="first">
          <!--<div class="handle-box">-->
          <!--  <el-input-->
          <!--      type="text"-->
          <!--      v-model="search"-->
          <!--      size="medium"-->
          <!--      placeholder="输入关键字搜索"/>-->
          <!--</div>-->
          <el-table :data="files.filter(data => !search || data.old_name.toLowerCase().includes(search.toLowerCase()))"
                    :show-header="true"
                    :default-sort = "{prop: 'upload_time', order: 'descending'}"
                    border
                    class="table"
                    header-cell-class-name="table-header">
            <el-table-column label="本地文件名" prop="old_name" width="200" sortable></el-table-column>
            <el-table-column label="服务器文件名" prop="new_name" width="180" sortable></el-table-column>
            <el-table-column label="文件路径" prop="path" width="180"></el-table-column>
            <el-table-column label="文件大小" prop="size" width="180" sortable></el-table-column>
            <el-table-column label="上传时间" prop="upload_time" width="200" sortable></el-table-column>
            <el-table-column label="操作" width="250" align="center">
              <template slot-scope="scope">
                <el-button
                    type="text"
                    icon="el-icon-download"
                    @click="handleDownload(scope.$index, scope.row)"
                >下载
                </el-button>
                <el-button
                    type="text"
                    icon="el-icon-video-play"
                    @click="handlePlay(scope.$index, scope.row)"
                >播放
                </el-button>
                <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="handle-row">
            <el-button type="primary" @click="listFile">刷新文件列表</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="`文件上传(${files.length})`" name="second">
          <template v-if="message === 'second'">

            <div class="content-title">支持拖拽</div>
            <div class="plugins-tips">
              Element UI自带上传组件。
              访问地址：<a href="http://element.eleme.io/#/zh-CN/component/upload" target="_blank">Element UI Upload</a>
            </div>
            <el-upload
                class="upload-demo"
                drag
                action="http://localhost:8787/file/upload"
                name="aaa"
                multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>

            <div class="handle-row">
              <el-button type="danger">删除全部</el-button>
            </div>
          </template>
        </el-tab-pane>

        <el-tab-pane :label="`回收站(${files.length})`" name="third">
          <template v-if="message === 'third'">
            <el-table :data="recycle" :show-header="false" style="width: 100%">
              <el-table-column>
                <template slot-scope="scope">
                  <span class="message-title">{{ scope.row.title }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" width="150"></el-table-column>
              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button @click="handleRestore(scope.$index)">还原</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="handle-row">
              <el-button type="danger">清空回收站</el-button>
            </div>
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabs',
  data() {
    return {
      message: 'first',
      showHeader: false,
      search: "",
      files: [
        {id: "123", old_name: "file1", new_name: "file2", path: "/", size: "65525", upload_time: "2015-05-02"}
      ]
    }
  },
  methods: {
    handleDownload(index,row) {
      window.open("http://localhost:8787/file/download?id="+row.id,"_self");
      //this.$http.get("http://localhost:8787/file/download?id="+row.id);
    },
    handlePlay(index,row) {
      window.open("http://localhost:8787/file/video?id="+row.id,"_blank");
      //this.$http.get("http://localhost:8787/file/video?id="+row.id);
    },
    handleDelete(index,row) {
      this.$http.get("http://localhost:8787/file/delete?id="+row.id).then(res => {
        this.files = res.data;
      });
      this.listFile();
    },
    listFile(){
      this.$http.get("http://localhost:8787/file/list").then(res => {
        this.files = res.data;
      })
    }
  },
  computed: {
    unreadNum() {
      return this.unread.length;
    }
  },
  created() {
    this.listFile();
  }
}

</script>

<style>
.message-title {
  cursor: pointer;
}

.handle-row {
  margin-top: 30px;
}

.table {
  width: 100%;
  font-size: 14px;
}
</style>

