<template>
  <div class="upload">
    <form v-on:submit.prevent="upload" enctype="multipart/form-data">
      <div>
        <label name="file">Select image to upload:</label>
        <input type="file" name="file" id="file" accept="image/*" />
      </div>
      <div>
        <input type="submit" value="Upload Image" name="submit" />
      </div>
    </form>

    <div class="container">
      <!--UPLOAD-->
      <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
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
          <p v-if="isInitial || isSuccess">
            Drag your file(s) here to begin
            <br />or click to browse
          </p>
          <p v-if="isSaving">Uploading {{ fileCount }} files...</p>
        </div>
      </form>
    </div>
    {{result}}
  </div>
</template>

<script>
import * as axios from "axios";

// function upload(formData) {
// const url = `${BASE_URL}/photos/upload`;
// const url = `/api/upload/single`;
// return axios.post(url, formData)
//     // get data
//     .then(x => {
//       x.data
//     })
// add url field
// .then(x => x.map(img => Object.assign({},
//     img, { url: `${BASE_URL}/images/${img.id}` })));
// }

// import { upload } from "./file-upload.service";
const STATUS_INITIAL = 0,
  STATUS_SAVING = 1,
  STATUS_SUCCESS = 2,
  STATUS_FAILED = 3;

export default {
  name: "UploadForm",
  data() {
    return {
      result: null,
      uploadedFiles: [],
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
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      // upload(formData)
      const url = `/api/upload/single`;
      // return (
      axios
        .post(url, formData)
        // get data
        // .then(x => {
        //   let obj = x.data;
        // })
        .then(response => {
          this.result = response.data;
          this.uploadedFiles = [].concat(x);
          this.currentStatus = STATUS_SUCCESS;
        })
        .catch(err => {
          this.uploadError = err.response;
          this.currentStatus = STATUS_FAILED;
        });
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
