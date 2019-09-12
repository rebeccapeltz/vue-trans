<template>
  <div class="upload">
    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial">
        <h1>Upload images</h1>
        <div class="dropbox">
          <input
            type="file"
            :name="uploadFieldName"
            :disabled="isSaving"
            @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
            accept="image/*"
            class="input-file"
          />
          <p v-if="isInitial">
            Drag your file(s) here to begin
            <br />or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
      </form>
    </div>
    <div v-if="uploadedUrl">
      <img :src="uploadedUrl" alt="uploaded photo" />
    </div>
    <div>{{result}}</div>
  </div>
</template>

<script>
import * as axios from "axios";

const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "UploadForm",
  data() {
    return {
      result: null,
      uploadedUrl: null,
      uploadError: null,
      currentStatus: null,
      uploadFieldName: "singleFile"
    };
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      // this.uploadedFiles = [];
      this.uploadError = null;
    },
    async save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      // upload(formData)
      const url = `/api/upload/single`;

      try {
        const response = await axios.post(url, formData);
        this.result = await response.data;
        this.uploadedUrl = this.result.photo_url; 
        let arr = this.uploadedUrl.split("/");
        // let xform = "e_improve,w_300,h_400,c_scale,g_auto";
        let xform = "c_thumb,w_200,g_face"

        arr.splice(6, 0, xform);
        this.uploadedUrl = arr.join("/");    
        this.currentStatus = STATUS_SUCCESS;
        this.reset();
      } catch (err) {
        console.log(err)
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      }

 

      // axios
      //   .post(url, formData)
      //   .then(response => {
      //     this.result = response.data;
      //     let arr = this.result.photo_url.split("/");
      //     let xform = "e_improve,w_300,h_400,c_scale,g_auto";
      //     arr.splice(6, 0, xform);
      //     this.uploadedUrl = arr.join("/");
      //     this.currentStatus = STATUS_SUCCESS;
      //     this.reset();
      //   })
      //   .catch(err => {
      //     this.uploadError = err.response;
      //     this.currentStatus = STATUS_FAILED;
      //   });
      // );
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).map(x => {
        formData.append(fieldName, fileList[x], fileList[x].name);
      });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  }
};
/*
img.split("/")
let xform = "c_thumb,w_200,g_face"
let xform = "e_improve,w_300,h_600,c_thumb,g_auto"
arr.splice(6,0,xform)
arr.join("/")
*/
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dropbox {
  outline: 2px dashed grey; /* the dash box */
  outline-offset: -10px;
  background: lightcyan;
  color: dimgray;
  padding: 10px 10px;
  min-height: 200px; /* minimum height */
  position: relative;
  cursor: pointer;
}

.input-file {
  opacity: 0; /* invisible but it's there! */
  width: 100%;
  height: 200px;
  position: absolute;
  cursor: pointer;
}

.dropbox:hover {
  background: lightblue; /* when mouse over to the drop zone, change color */
}

.dropbox p {
  font-size: 1.2em;
  text-align: center;
  padding: 50px 0;
}
</style>
