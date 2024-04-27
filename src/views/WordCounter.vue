<template v-if="wordCounterVisible">
  <h1>{{ title }}</h1>
  <div class="word-counter">
    <textarea
      id="input"
      placeholder="Type your text here or upload file below"
      v-model="inputText"
    ></textarea>
    <div class="info-controls">
      <ul>
        <CountBox
          v-for="(countType, index) in countTypes"
          :text="countType.text"
          :count="countType.count"
          :key="index"
        />        
      </ul>
      <div class="toggle-container">
        <ToggleCheckbox
          id="save-script"
          label="Save Script"
          default="true"
          @toggleStateChanged="handleSaveScript"
        />
        <ToggleCheckbox
          id="default-off-toggle"
          label="Default Off Toggle"
          default="false"
        />
      </div>
    </div>
  </div>
  <div class="button-group horizontal">
    <button class="primary" @click="triggerFileInput">Upload File</button>
    <input
      type="file"
      ref="fileInput"
      @change="handleFileUpload"
      style="display: none"
    />
    <button @click="copyScriptText()" class="primary align-left">
      Copy Script
    </button>
    <button @click="handleClearScriptConfirmModal()" class="delete align-left">
      Clear Script
    </button>
  </div>

  <br />
  <br />
  <p>
    Does your voiceover script formatting need a little help?<br />
    <span class="headroom-mini"
      >Try the <a href="">Voice Over Script Formatter</a></span
    >
  </p>
  <!-- <p class="side-note">(Don't worry, your script will come with you)</p> -->

  <ModalComponent
    :show="showModal"
    title="Confirmation"
    message="Are you sure you want to delete this text?"
    @confirm="handleClearScriptConfirmed"
    @closeModal="handleCloseModal"
  ></ModalComponent>
</template>

<script>
import watch from "vue";
import CountBoxVue from "@/components/CountBox.vue";
import ToggleCheckboxVue from "@/components/ToggleCheckbox.vue";
import ModalComponentVue from "@/components/ModalComponent.vue";

export default {
  name: "WordCounter",
  components: {
    CountBox: CountBoxVue,
    ToggleCheckbox: ToggleCheckboxVue,
    ModalComponent: ModalComponentVue,
  },
  data() {
    return {
      title: "Voice Over Script Word Counter",
      buttonText: "Count Words and Character",
      inputText: localStorage.getItem("wordCounterText") || "", // Get local storage and apply to textarea or leave blank
      totalCharCount: 0,
      totalCharCountWithoutSpaces: 0,
      totalWordCount: 0,
      totalSentenceCount: 0,
      totalParagraphCount: 0,
      totalLineCount: 0,
      totalReadingTime: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      counted: false,
      showModal: false,
      toggles: {
        "save-script": false,
        "still-toggling": false,
        "yet-another-toggle": false,
      },
    };
  },
  computed: {
    countTypes() {
      return [
        { text: "Character Count", count: this.totalCharCount },
        { text: "Characters (no spaces)", count: this.totalCharCountWithoutSpaces },
        { text: "Words", count: this.totalWordCount },
        { text: "Sentences", count: this.totalSentenceCount },
        { text: "Paragraphs", count: this.totalParagraphCount },
        { text: "Lines", count: this.totalLineCount },
        { text: "Reading Time", count: this.totalReadingTime },
      ];
    }
  },
  watch: {
    inputText() {
      this.handleFormTasks();
      this.handleSaveScript();
    },
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.inputText = e.target.result;
        };
        reader.readAsText(file);
      }
    },
    handleClearScriptConfirmed() {
      this.showModal = false;
      this.inputText = "";
    },
    handleCloseModal() {
      this.showModal = false;
    },
    handleSaveScript(data) {
      if (data) {
        this.toggles[data.id] = data.checked;
      }
      if (this.toggles['save-script']) {
        localStorage.setItem("wordCounterText", this.inputText);
      } else {
        localStorage.setItem("wordCounterText", "");
      }
    },
    handleClearScriptConfirmModal() {
      this.showModal = true;
    },
    copyScriptText() {
      navigator.clipboard.writeText(this.inputText).then(
        () => {
          // clipboard successfully set
          this.showMessage("Copied!", "success");
        },
        (error) => {
          /* clipboard write failed */
          console.log("error = ", error);
        }
      );
    },
    showMessage(message, status) {
      this.$root.showMessageBar(message, status);
    },
    handleFormTasks() {
      let wordCount = 0;
      let words = this.inputText.split(/\s+/);
      let sentences = this.inputText.match(/[A-Z0-9].*?(?:[.!?]|\n)/gi);
      let paragraphs = this.inputText.split(/\n\n+/);
      let lines = this.inputText.split("\n");
      // Count words
      for (let i = 0; i < words.length; i++) {
        let word = words[i];
        if (word.match(/[0-9a-zA-Z]/)) {
          wordCount++;
        }
      }

      // Count sentences
      this.totalSentenceCount = sentences ? sentences.length : 0;

      // Count paragraphs
      if (paragraphs) {
        this.totalParagraphCount = paragraphs.filter((paragraph) =>
          paragraph.match(/[0-9a-zA-Z]/)
        ).length;
      }

      // Count lines with at least one valid character
      this.totalLineCount = lines.filter((line) =>
        line.match(/[0-9a-zA-Z]/)
      ).length;

      // Count the number of characters in the text
      this.totalCharCount = this.numberize(this.inputText.length);
      this.totalCharCountWithoutSpaces = this.numberize(
        this.inputText.replace(/\s/g, "").length
      );
      this.totalWordCount = this.numberize(wordCount);

      // Calculate the reading time based on 3 words per second
      let readingTime = wordCount / 3;

      // Convert the reading time from seconds to minutes
      let minutes = Math.floor(readingTime / 60);
      let seconds = Math.round(readingTime % 60);

      // Convert minutes to hours
      let hours = Math.floor(minutes / 60);

      // Calculate remaining minutes
      minutes = minutes % 60;

      this.hours = this.addLeadingZero(hours);
      this.minutes = this.addLeadingZero(minutes);
      this.seconds = this.addLeadingZero(seconds);
      this.counted = true;

      // NOTE: This works to make it taller, but not shorter.
      // Probably have to use a hidden div to measure and than update using that height
      // const textarea = document.getElementById("input");
      // const newHeight = textarea.scrollHeight;
      // document.getElementById("input").style.height = newHeight + "px";
    },
    addLeadingZero(num) {
      let number = num < 10 ? "0" + num : num;
      return number;
    },
    numberize(num) {
      // Adds commas to a number (ie. 1000 -> 1,000)
      let numWithCommas = num.toLocaleString("en-US");
      return numWithCommas;
    },
  },
  mounted() {
    this.handleFormTasks();
  },
};
</script>
