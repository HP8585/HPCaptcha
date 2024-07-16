<script setup>
import { defineProps, ref, onMounted, watchEffect } from "vue";

const props = defineProps({
    theme:{
        type: String,
        default: '#4db2ec'
    },
    checkclr:{
        type: String,
        default: '#4db2ec'
    },
    boxclr:{
        type: String,
        default: "white"
    },
    boxBorderclr:{
        type: String,
        default: "#94a3b8"
    },
    boxSize: {
        type: String,
        default: '20em'
    }
});
const emits = defineEmits(['valid', 'invalid', 'update:modelValue']);


const modalActive = ref(false);

const chosenWord = ref(null);
const trialImages = ref([]);
const chosenImages = ref([]);
const imgCaptchaVerified = ref(false);

const captchaTerms = [
    "Crosswalk", "Car", "Bicycle",
    "Airplane", "Banana", "Laptop", "Phone", "Flower"
];

const images = [
    {
        src: "https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU",
        keyword: "Laptop"
    },
    {
        src: "https://fastly.picsum.photos/id/9/5000/3269.jpg?hmac=cZKbaLeduq7rNB8X-bigYO8bvPIWtT-mh8GRXtU3vPc",
        keyword: "Laptop"
    },
    {
        src: "https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so",
        keyword: "Laptop"
    },
    {
        src: "https://fastly.picsum.photos/id/180/2400/1600.jpg?hmac=Ig-CXcpNdmh51k3kXpNqNqcDYTwXCIaonYiBOnLXBb8",
        keyword: "Laptop"
    },
    {
        src: "https://fastly.picsum.photos/id/370/4928/3264.jpg?hmac=UGe0txSnG4hhV-fAoi7e3mTnvQFhYYNcPJJbYFePh5Q",
        keyword: "Laptop"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Crosswalk_of_Market_at_Third%2C_San_Francisco.jpg/2560px-Crosswalk_of_Market_at_Third%2C_San_Francisco.jpg",
        keyword: "Crosswalk"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Panneaux_suisses_3.02_2.41.1.jpg/220px-Panneaux_suisses_3.02_2.41.1.jpg",
        keyword: "Crosswalk"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/GFX02488_%2833373154670%29.jpg/220px-GFX02488_%2833373154670%29.jpg",
        keyword: "Crosswalk"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/4876Maduya%2C_Carmona%2C_Cavite_Landmarks_33.jpg/220px-4876Maduya%2C_Carmona%2C_Cavite_Landmarks_33.jpg",
        keyword: "Crosswalk"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Tactile_paving_2.jpg/220px-Tactile_paving_2.jpg",
        keyword: "Crosswalk"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/a4/2019_Toyota_Corolla_Icon_Tech_VVT-i_Hybrid_1.8.jpg",
        keyword: "Car"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Tesla_Roadster.JPG/355px-Tesla_Roadster.JPG",
        keyword: "Car"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/2/23/Pontiac_GTO_1966.jpg",
        keyword: "Car"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/00_KIA_K8_3.jpg",
        keyword: "Car"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/2022_Lucid_Air_Grand_Touring_in_Zenith_Red%2C_front_left.jpg/1200px-2022_Lucid_Air_Grand_Touring_in_Zenith_Red%2C_front_left.jpg",
        keyword: "Car"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/UnitedandVA_32315_%2816735062459%29.jpg",
        keyword: "Airplane"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Ryanair.arp.750pix.jpg",
        keyword: "Airplane"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Tarom.b737-700.yr-bgg.arp.jpg",
        keyword: "Airplane"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Boeing_707-321B_Pan_Am_Freer.jpg/800px-Boeing_707-321B_Pan_Am_Freer.jpg",
        keyword: "Airplane"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Egyptair.a330-200.su-gce.arp.jpg/1200px-Egyptair.a330-200.su-gce.arp.jpg",
        keyword: "Airplane"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Left_side_of_Flying_Pigeon.jpg",
        keyword: "Bicycle"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Triumph_Bicycle.JPG/320px-Triumph_Bicycle.JPG",
        keyword: "Bicycle"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/86/Sykkel_st%C3%B8ttestang_2.JPG",
        keyword: "Bicycle"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Mountainbike.jpg/1200px-Mountainbike.jpg",
        keyword: "Bicycle"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Orbea_Occam_2020.jpg/1200px-Orbea_Occam_2020.jpg",
        keyword: "Bicycle"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Essential_Phone_in_ocean_depths.jpg/220px-Essential_Phone_in_ocean_depths.jpg",
        keyword: "Phone"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Fire_Phone.jpg",
        keyword: "Phone"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Wikipedia_mobile_on_Android.jpg/2516px-Wikipedia_mobile_on_Android.jpg",
        keyword: "Phone"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Apple_iPhone.jpg",
        keyword: "Phone"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Nokia_Lumia_1020_front.jpg",
        keyword: "Phone"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Cavendish_Banana_DS.jpg",
        keyword: "Banana"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Banana_Fruit.JPG",
        keyword: "Banana"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Banana_%28partially_peeled%29.jpg",
        keyword: "Banana"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Bananas_%28Alabama_Extension%29.jpg",
        keyword: "Banana"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Rasa_BaLe_HaNNu.JPG",
        keyword: "Banana"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg/800px-Bachelor%27s_button%2C_Basket_flower%2C_Boutonniere_flower%2C_Cornflower_-_3.jpg",
        keyword: "Flower"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flower_jtca001.jpg",
        keyword: "Flower"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Hepatica_nobilis_flowers_-_blue_and_pink_-_Keila.jpg/450px-Hepatica_nobilis_flowers_-_blue_and_pink_-_Keila.jpg",
        keyword: "Flower"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg/640px-Nelumno_nucifera_open_flower_-_botanic_garden_adelaide2.jpg",
        keyword: "Flower"
    },
    {
        src: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Rosa_rubiginosa_1.jpg",
        keyword: "Flower"
    },
]

function generateChosenWord(){
    chosenWord.value = captchaTerms[Math.floor(Math.random() * captchaTerms.length)];
    return chosenWord.value;
}

function getRandomImagesArray(imagesArray){
    const randomImagesArray = [];
    const chosenImagesIndices = [];

    while(randomImagesArray.length < 9){
        const randomIndex = Math.floor(Math.random() * imagesArray.length);
        if(!chosenImagesIndices.includes(randomIndex)){
            randomImagesArray.push(imagesArray[randomIndex]);
            chosenImagesIndices.push(randomIndex)
        }
    }
    return randomImagesArray;
}

function getRandomTrialImages(chosenKeyword){
    let trialImagesArray = [];

    while(trialImagesArray.length === 0 || trialImagesArray.filter(img => img.keyword === chosenKeyword).length < 3 || trialImagesArray.filter(img => img.keyword === chosenKeyword).length > 4){
        trialImagesArray = getRandomImagesArray(images);

        //Filter out images with repetitive src properties
        trialImagesArray = trialImagesArray.filter((img, idx)=> trialImagesArray.findIndex(item => item.src === img.src) === idx);
    }

    trialImages.value = trialImagesArray;
}

onMounted(()=>{
    generateChosenWord();
    getRandomTrialImages(chosenWord.value);

    window.addEventListener('click', ()=> modalActive.value = false);
})

function handleChooseImg(img){
    let objIdx = chosenImages.value.findIndex(item => item.src === img.src);

    if(objIdx === -1){
        chosenImages.value.push(img);
    } else {
        chosenImages.value.splice(objIdx, 1);
    }
};

function isImageSelected(img){
    for(let i = 0; i < chosenImages.value.length; i++){
        if(chosenImages.value[i].src === img.src){
            return true;
        }
    }
    return false;
};

function verifyImages() {
let correct = true;

chosenImages.value.forEach(item =>{
    if (item.keyword !== chosenWord.value){
        correct = false;
    }
});
 
if (correct){
    imgCaptchaVerified.value = true;
    modalActive.value = false;
    setTimeout(() => {
        imgCaptchaVerified.value = false;
        emits('update:modelValue', imgCaptchaVerified.value)
    }, 20000);
    emits('valid');
    emits('update:modelValue', imgCaptchaVerified.value)
} else {
    chosenImages.value = [];
    generateChosenWord();
    getRandomTrialImages(chosenWord.value);
    emits('invalid');
}
};

function refreshImages(){
    chosenImages.value = [];
    generateChosenWord();
    getRandomTrialImages(chosenWord.value);
}

watchEffect(()=>{
    if(modalActive.value){
    setTimeout(() => {
        chosenImages.value = [];
        generateChosenWord();
        getRandomTrialImages(chosenWord.value);
    }, 200);
    }
});

</script>

<template>
<div>
    <Transition name="imgModal">
    <div class="imgModal" v-show="modalActive" @click.stop="modalActive=true">
    <div class="header" :style="`background-color: ${props.theme};`">
        Select All <strong>{{ chosenWord }}</strong> Images
    </div>
    <ul class="images">
        <li v-for="(img, idx) in trialImages" :key="idx" 
        :class="{selected: isImageSelected(img)}"
        @click="handleChooseImg(img)">
        <Icon name="material-symbols-light:check-box-rounded" 
        v-show="isImageSelected(img)"
        class="check"
        :size="35"
        />
            <img :src="img.src" alt="img">
        </li>
    </ul>
    <div class="buttons" :style="`background-color: ${props.theme};`">
        <button
        class="refresh"
        @click="refreshImages()">
        <Icon name="ci:redo" size="25"/>
        </button>

        <button
        class="check"
        @click.stop="verifyImages"
        :disabled="chosenImages.length < 3"
        :class="{disabled: chosenImages.length < 3}"
        :style="`background-color: ${props.checkclr};`"
        >Check</button>
    </div>
</div>
</Transition>


    <div class="activationBox" @click.stop="modalActive=true"
    :class="{verified: imgCaptchaVerified}"
    :style="`background-color: ${props.boxclr};
    border: 1px ${props.boxBorderclr} solid; width: ${props.boxSize};`">
        <div>
            I'm not a robot
            <Icon name="ic:twotone-check" color="red"
            size="35" class="check" v-if="imgCaptchaVerified"/>
            <div class="checkbox" v-else/>

         
        </div>
        
        <img src="../assets/logo.svg" alt="">

    </div>
</div>
</template>

<style scoped>
.imgModal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    border-radius: 10px;
    overflow: hidden;
}
.imgModal.active{
    display: block;
}
.imgModal-enter-active,
.imgModal-leave-active {
  transition: opacity 0.2s ease;
}

.imgModal-enter-from,
.imgModal-leave-to {
  opacity: 0 ;
  transition: opacity 0.2s ease;
}

.imgModal .header{
    padding: 20px;
    color: white;
}

ul.images{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    list-style: none;
    gap: 0;
    background-color: white;
    margin: 0;
    padding: 0;
}
ul.images > li{
    position: relative;
    height: fit-content;
    max-height: 8em;
}
ul.images > li img{
    width: 8em;
    height: 8em;
    object-fit: cover;
}
ul.images > li.selected{
    transform: scale(0.95);
}
ul.images > li .check{
    position: absolute;
    top: 0;
    right: 2px;
    z-index: 20;
    color: #4db2ec;
}
.buttons{
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-top: -4px;
}
.buttons button.check{
    outline: none;
    border: none;
    color: white;
    padding: 6px;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
}
.buttons button.check.disabled{
    background-color: #94a3b8;
    opacity: 0.6;
    color: white;
    cursor: auto;
}
.buttons button.refresh{
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
}
/* Activation Box */
.activationBox{
    margin-top: 2em;
    padding: 25px;
    font-size: 1.05rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    position: relative;
}
.activationBox.verified{
    padding: 18px;
}
.activationBox .check{
    color: #15803d;
}
.activationBox > div{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    gap: 0.4em;
}
.activationBox > div .checkbox{
    width: 20px;
    height: 20px;
    border: 1px #94a3b8 solid;
    border-radius: 2px;
}
.activationBox img{
    width: 8em;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
</style>