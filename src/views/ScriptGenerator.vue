<template>
  <h1>{{ title }}</h1>
  <div class="script-generator">
    <DropdownComponent
      :dropdown="dropdown.adjectives"
      @dropdown-events="handleDropdownUpdates"
    />
    <DropdownComponent
      v-bind:dropdown="dropdown.nouns"
      @dropdown-events="handleDropdownUpdates"
    />

    <!-- <br />
    <label for="problem">Enter a Daily Human Problem:</label>
    <input type="text" id="problem" v-model="subject" />
    <br />
    <label for="full-cript">Full Script:</label>
    <input type="text" id="full-script" v-model="prompt" />
    <br /> -->
    <button @click="generateScript">Generate Script</button>
    <p>
      Note: Don't forget to save this somewhere! Once it's gone, it will
      probably never generate the same again.
    </p>
    <br />
    <button @click="copyGeneratedScript()">Copy Text</button>
    <textarea
      v-model="generatedScript"
      v-on:focus="$event.target.select()"
      ref="myinput"
    ></textarea>
  </div>

  <p>
    Getting ready to make an offer to a client? Use our script or paste in your
    own. <button>Show Script!</button>
  </p>
</template>

<script>
import DropdownComponentVue from "@/components/DropdownComponent.vue";

export default {
  name: "ScriptGenerator",
  components: {
    DropdownComponent: DropdownComponentVue,
  },
  data() {
    return {
      title: "Voice Over Script Generator",
      buttonText: "Generate Script",
      generatedScript: localStorage.getItem("generatedScriptText") || "",
      apiUrl: "https://api.openai.com/v1/completions",
      apiKey: "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",
      model: "text-davinci-003",
      adjective: "",
      subject: "",
      maxTokens: 4000,
      temperature: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      dropdown: {
        adjectives: {
          options: ["Funny", "Dark", "Professional"],
          placeholder: "Enter an ",
          selectedOption: "adjective",
        },
        nouns: {
          options: ["house", "car", "food"],
          placeholder: "Enter a ",
          selectedOption: "noun",
        },
      },
    };
  },
  computed: {
    prompt() {
      return (
        "Write a " +
        this.adjective +
        " commercial script for a voice over artist about a solution to " +
        this.subject +
        ""
      );
    },
  },
  methods: {
    handleDropdownUpdates({ dropdown, selectedOption }) {
      console.log("dropdown", dropdown);
      console.log("selectedOption", selectedOption);

      dropdown.selectedOption = selectedOption;
    },
    async generateScript() {
      const requestBody = {
        prompt: this.prompt,
        max_tokens: this.maxTokens,
        temperature: this.temperature,
        n: this.n,
        model: this.model,
        frequency_penalty: this.frequency_penalty,
        presence_penalty: this.presence_penalty,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(requestBody),
      };

      try {
        const response = await fetch(this.apiUrl, requestOptions);
        const responseJson = await response.json();
        this.generatedScript = responseJson.choices[0].text; // return the generated text
        localStorage.setItem("generatedScriptText", this.generatedScript);
      } catch (error) {
        console.error(error);
      }
    },
    copyGeneratedScript() {
      navigator.clipboard.writeText(this.generatedScript).then(
        () => {
          /* clipboard successfully set */
          console.log("Copied text = ", this.generatedScript);
        },
        (error) => {
          /* clipboard write failed */
          console.log("error! = ", error);
        }
      );
    },
  },
};
</script>
