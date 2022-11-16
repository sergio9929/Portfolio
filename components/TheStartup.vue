<script setup>
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

const startup = ref(null)
const startupTitle = ref(null)
const startupSubtitle = ref(null)

onMounted(() => {
    const titleWords = startupTitle.value.textContent.split(' ')
    startupTitle.value.innerHTML = titleWords.map(word => `<span class="startup__title-outer"><span class="startup__title-inner">${word}</span></span>`).join(' ')

    gsap.registerPlugin(TextPlugin);
    console.log('Startup animations: ✨')

    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out',
        }
    })

    tl.set(document.body, {
        overflow: 'hidden',
    }, '+=.5').set(startupTitle.value, {
        opacity: 1
    }, '<').set(startupSubtitle.value, {
        opacity: 1
    }, '<').from(startupTitle.value, {
        scale: .5,
        duration: 2,
    }).from('.startup__title-inner', {
        opacity: 0,
        yPercent: 100,
        stagger: .5,
        duration: 1,
        ease: 'power4',
    }, '<').fromTo('.startup__typing1', {
        text: "",
    }, {
        text: "Desarrollador",
        boxShadow: 'var(--border-width) 0 0 0 var(--primary-color)',
        duration: "Desarrollador".length * .1,
        ease: "power1.in"
    }, '>').set('.startup__typing1', {
        boxShadow: 'none',
    }).fromTo('.startup__typing2', {
        text: "",
    }, {
        text: "web",
        boxShadow: 'var(--border-width) 0 0 0 var(--primary-color)',
        duration: "web".length * .1,
        ease: "power1.in"
    }).set('.startup__typing2', {
        boxShadow: 'none',
    }, '+=.5').set('.startup__typing1', {
        boxShadow: 'var(--border-width) 0 0 0 var(--primary-color)',
    }).to('.startup__typing1', {
        backgroundColor: '#000',
        color: '#fff',
    }, '+=.5').fromTo('.startup__typing1', {
        text: "",
        backgroundColor: 'transparent',
        color: 'inherit',
    }, {
        text: "Diseñador y desarrollador",
        duration: "Diseñador y desarrollador".length * .1,
        ease: "power1.inOut"
    }, '+=.2').set('.startup__typing1', {
        boxShadow: 'none',
    }).to(startupSubtitle.value, {
        y: startupTitle.value.scrollHeight,
        duration: 1,
    }, '+=1').to(startupTitle.value, {
        yPercent: 100,
        duration: 1,
    }, '<').to(startup.value, {
        yPercent: -100,
        duration: 1,
        onComplete() {
            gsap.set(startup.value, {
                display: 'none'
            })
        }
    }, '<').set(document.body, {
        overflow: 'auto',
        onComplete() {
            gsap.matchMediaRefresh()
        }
    }, '<')
})
</script>

<template>
    <div class="startup" ref="startup">
        <h1 class="startup__title" ref="startupTitle">Sergio Rodriguez</h1>
        <h2 class="startup__subtitle" ref="startupSubtitle">&nbsp;<span class="startup__typing1">Diseñador y
                desarrollador</span> <span class="startup__typing2">web</span></h2>
    </div>
</template>

<style>
.startup {
    position: fixed;
    inset: 0;
    background-color: var(--base-color);
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow: hidden;
}

.startup__title {
    opacity: 0;
    font-size: 8rem;
    width: 5em;
    overflow: hidden;
}

.startup__title-outer {
    display: inline-flex;
    overflow: hidden;
}

.startup__title-inner {
    display: inline-block;
}

.startup__subtitle {
    opacity: 0;
    font-size: 1.5rem;
    font-weight: normal;
    margin-bottom: 2em;
}

@media (max-width: 768px) {
    .startup__title {
        font-size: 3rem;
    }

    .startup__subtitle {
        font-size: 1rem;
    }
}
</style>