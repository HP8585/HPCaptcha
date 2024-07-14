## Document  
With our module you can have your own customizable recaptcha in a matter of second!

after installing module head into nuxt.config.ts and set it as follows below:  

>  export default defineNuxtConfig({  
 devtools: { enabled: true },  
  modules:["nuxt-hpcaptcha"]  
});

then you can use our component in your template like this:  
``<HPCaptcha/>``


**There are some properties and emits to let you customize the component in accordance to your needs:**

### Props:
<center>

|Prop|HPCaptcha|HPCaptchaImg|
|:---------:|:------------:|:----:|
|captchaSize|✅|❌|
|length|✅|❌|
|bgclr|✅|❌|
|theme|❌|✅|
|checkclr|✅|✅|
|reloadclr|✅|❌|
|boxclr|❌|✅|
|boxBorderclr|❌|✅|
|inputBorderclr|✅|❌|
|letterSensitive|✅|❌|
|boxSize|❌|✅|

</center>

**"captchaSize" :**  
type: String  
default: "2.5rem"  
description: Change the captcha font size as you like *(e.g 20px, 4rem)*;

**"length" :**  
type: Number  
default: 6  
description: You can set how many characters each captcha you want to include;

**"bgclr" :**  
type: String  
default: 'white'  
description: You can change the wrapper background color;

**"reloadclr" :**  
type: String  
default: '#4db2ec'  
description: You can change the reload button color;

**"checkclr" :**  
type: String  
default: '#4db2ec'  
description: You can change the check button color;

**"letterSensitive" :**  
type: Boolean  
default: true  
description: When True the recaptcha validation will be sensitive to lower/uppercase letters but when set to False you can ignore whether a letter in captcha is lower/uppercase;

**"inputBorderclr" :**  
type: String  
default: '#94a3b8'  
description: When recaptcha input has a value the input will assume a border color, by this prop you can change the color or make it 'transparent';

**"theme" :**  
type: String  
default: '#4db2ec'  
description: You can set the overall color of your image captcha container;

**"boxclr" :**  
type: String  
default: 'white'  
description: With this prop you can set the the color of the initial ("I'm not a robot") box;

**"boxBorderclr" :**  
type: String  
default: '#94a3b8'  
description: By this prop you can easily change the border color of the initial ("I'm not a robot") box;

---------------------------------------------------------------------------------------

### Emits:

<center>

|Emit|HPCaptcha|HPCaptchaImg|
|:---------:|:------------:|:----:|
|valid|✅|✅|
|invalid|✅|✅|
|v-model|❌|✅|

</center>

**"valid" :**   
When user clicks on the check button if the captcha matches, this emit will be called;

**"invalid" :**  
When user clicks on the check button if the captcha does not match, this emit will be called;

**"v-model" :**  
You can have the value of the image recaptcha whether it's been verified or not;

**My Github: HP8585**  
**My Email: hossein7090100@gmail.com**