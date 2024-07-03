<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';

const emits = defineEmits(['valid', 'invalid']);
const props = defineProps({
    length:{
        type: Number,
        default: 6
    },
    bgclr:{
        type: String,
        default: 'white'
    },
    reloadclr:{
        type: String,
        default: '#4db2ec'
    },
    checkclr:{
        type: String,
        default: '#4db2ec'
    },
    letterSensitive:{
        type: Boolean,
        default: true
    },
    inputBorderclr:{
        type: String,
        default: '#94a3b8'
    },
    captchaSize:{
        type: String,
        default: "2.5rem"
    }
})

const captcha = ref('');
const inputV = ref(null);
const isCaptchaValid = ref(false);
const statusTextShown = ref(false);

const allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
                        'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
                        'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                        'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y',
                        'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function getCaptcha(){
    if(captcha.value) captcha.value= '';

    for(let i=0; i < props.length; i++){
        let randomChar = allCharacters[Math.floor(Math.random() * allCharacters.length)];
        captcha.value+= randomChar;
    }
}

onMounted(()=>{
    getCaptcha()
});

function captchaValidity(){
    statusTextShown.value = true;
    if(props.letterSensitive){

        if(String(captcha.value) === String(inputV.value)){
            isCaptchaValid.value = true;
            emits('valid');
        }else{
            isCaptchaValid.value = false;
            emits('invalid')
        }
    }else{
        if(String(captcha.value).toLocaleLowerCase() === String(inputV.value).toLocaleLowerCase()){
            isCaptchaValid.value = true;
            emits('valid');
        }else{
            isCaptchaValid.value = false;
            emits('invalid')
        }
    }
}
</script>

<template>
  <div class="wrapper"
  :style="`background: ${props.bgclr};`"
  >

    <div class="captcha-area">

      <div class="captcha-img">
        <img src="../assets/ca1.png" alt="bg-img" draggable="false"/>
        <span class="captcha"
        :style="`font-size:${props.captchaSize};`"
        >{{ captcha }}</span>
      </div>

      <button class="reload-btn" @click="getCaptcha"
      :style="`background:${props.reloadclr};`"
      >
        <Icon name="ci:redo" size="25"/>
      </button>

    </div>


    <form @submit.prevent="captchaValidity" class="input-area">
      <input type="text" placeholder="Enter Captcha"
      v-model="inputV"
      :style="{ border: (inputV && inputV !== '' ) ? `1px solid ${props.inputBorderclr}` : '' }"
      required
      />

      <button class="check-btn" 
      :style="`background:${props.checkclr};`"
      >Check</button>
    </form>
    <span class="status-txt"
    v-show="statusTextShown"
    >
    {{ !isCaptchaValid ? "Captcha not matched. Please try again!" : "Captcha is valid" }}
    </span>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Margarine&display=swap');

.wrapper{
    border-radius: 10px;
    padding: 22px 30px;
    display: grid;
    place-items: center;
    gap: 10px;
}
.wrapper .captcha-area{
    display: flex;
    height: 65px;
    gap: .5em;
    /* align-items: center; */
    
}
.captcha-area .captcha-img{
    height: 100%;
    width: 345px;
    position: relative;
}
.captcha-img img{
    width: 100%;
    height: 100%;
    opacity: 0.95;
    object-fit: cover;
    border-radius: 5px;
}
.captcha-img .captcha{
    position: absolute;
    left: 50%;
    top: 50%;
    width: fit-content;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    letter-spacing: 25px;
    text-shadow: 0 0 1px #a9a9a9;
    font-family: "Margarine", serif;
    user-select: none;
}
.captcha-area .reload-btn{
    outline: none;
    border: none;
    padding: 1.5em;
    border-radius: 5px;
    cursor: pointer;
}

.input-area{
    position: relative;
    width: 100%;
    display: flex;
}
.input-area input{
    width: 100%;
    padding: 12px 8px;
    outline: none;
    border-radius: 5px;
    border: 1px #94a3b8 solid;
}

.input-area .check-btn{
    position: absolute;
    right: 4px;
    top: 50%;
    height: 85%;
    transform: translateY(-50%);
    padding: 4px 12px;
    border: none;
    outline: none;
    border-radius: 4px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    font-size: .9rem;
    visibility: hidden;
}
.input-area input:valid + .check-btn{
    visibility: visible;
}
span.status-txt{
    font-size: 0.9rem;
}
</style>