<script setup>
import { ArrowRightIcon, ArrowLeftIcon, ArrowDownIcon, ArrowTopRightOnSquareIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";

const hero = ref(null)
const heroButtons = ref(null)
const heroBackground = ref(null)
const slider = ref(null)
const sliderElements = computed(() => slider.value?.querySelectorAll('.element') || [])
let tl = null

const currentElement = ref(0)
const sliderOptions = ref({
    width: 12,
    maxWidth: 34,
    imgWidth: 28,
    height: 24,
    gap: 1,
})
const sliderData = ref([{
    img: 'Imagen 1.png',
    backgroundColor: '#F7F9FB',
    borderColor: '',
    link: '',
    externalLink: 'https://www.mnker.com/',
    title: 'Mnker',
}, {
    img: 'Imagen 2.png',
    backgroundColor: '#F8E6CF',
    borderColor: '',
    link: '',
    externalLink: 'https://vivebenalmadena.com/',
    title: 'Vive Benalmadena',
}, {
    img: 'Imagen 3.png',
    backgroundColor: '#9CC9F2',
    borderColor: '#fff',
    link: '',
    externalLink: 'https://valpatek.com/',
    title: 'Valpatek',
}, {
    img: 'Imagen 4.png',
    backgroundColor: '#4B7BB2',
    borderColor: '#fff',
    link: '',
    externalLink: '',
    title: '',
}, {
    img: 'Imagen 5.png',
    backgroundColor: '#0f0f0f',
    borderColor: '#fff',
    link: '',
    externalLink: '',
    title: '',
}])

watch(sliderElements, () => {
    if (sliderElements.value.length == sliderData.value.length) {
        console.log('Hero animations: ✨')
        loadAnimations()
    }
})

async function loadAnimations() {
    await nextTick();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

    tl = gsap.timeline();
    const mm = gsap.matchMedia();

    mm.add('(max-width: 768px)', () => {
        sliderOptions.value = {
            width: 6,
            maxWidth: 17,
            imgWidth: 14,
            height: 12,
            gap: 1,
        }
    })

    // keep track of the scroll position to sync ScrollTrigger and Draggable
    const proxy = document.createElement('div.proxy');
    function updateProxy() {
        if (heroScrollTrigger) {
            gsap.set(proxy, { x: -heroScrollTrigger.scroll() / 1.5, overwrite: 'auto' });
        }
    }

    const heroScrollTrigger = ScrollTrigger.create({
        animation: tl,
        trigger: hero.value,
        pin: true,
        pinSpacing: true,
        scrub: .2,
        start: 'top top',
        snap: 'labels',
        invalidateOnRefresh: true,
        end: () => '+=' + slider.value.scrollWidth * 2,
        onUpdate() {
            updateProxy()
        }
    })

    Draggable.create(proxy, {
        trigger: slider.value,
        type: 'x',
        onDrag() {
            heroScrollTrigger.scroll(-this.x * 1.5);
        }
    })

    sliderElements.value.forEach((element, index) => {
        const img = element.querySelector('.element__img')

        if (index == 0) {
            tl.set(element, {
                width: sliderOptions.value.maxWidth + 'rem',
                ease: 'power1.out',
            }).set(slider.value, {
                x: -1 * (sliderOptions.value.width + sliderOptions.value.gap) * index + 'rem',
                ease: 'power1.out',
            }, '<').set(img, {
                opacity: 1,
                yPercent: 0,
                transformOrigin: 'center bottom',
                scale: 1,
                ease: 'power1.out',
            }, '<').set(heroButtons.value, {
                scale: 1,
                ease: 'power1.out',
            }, '<')
        }

        if (index > 0) {
            tl.to(element, {
                width: sliderOptions.value.maxWidth + 'rem',
                ease: 'power1.out',
            }).fromTo(img, {
                yPercent: 10
            }, {
                opacity: 1,
                yPercent: 0,
                transformOrigin: 'center bottom',
                scale: 1,
                ease: 'power1.out',
                onStart() {
                    currentElement.value = index
                },
            }, '<').to(slider.value, {
                x: -1 * (sliderOptions.value.width + sliderOptions.value.gap) * index + 'rem',
                ease: 'power1.out',
            }, '<').to(heroButtons.value, {
                scale: 1,
                ease: 'power1.out',
            }, '<')
        }

        tl.addLabel('label' + index)

        if (index == sliderElements.value.length - 1) {
            tl.set(element, {}, '+=.25')
            return
        }

        tl.to(heroButtons.value, {
            scale: .9,
            ease: 'power1.in',
        }).to(element, {
            width: sliderOptions.value.width + 'rem',
            ease: 'power1.in',
        }, '<').to(img, {
            opacity: 0,
            yPercent: 10,
            transformOrigin: 'center bottom',
            scale: .5,
            ease: 'power1.in',
        }, '<').call(() => {
            currentElement.value = index
        })
    });
}

function jumpToElement(index) {
    if (index == currentElement.value) {
        gsap.timeline({
            defaults: {
                duration: .5,
            }
        }).to(sliderElements.value[index], {
            scale: 1.1,
            duration: .2,
        }).fromTo(heroBackground.value, {
            backgroundColor: 'transparent',
            scale: .5,
            opacity: 0
        }, {
            backgroundColor: sliderData.value[index].backgroundColor,
            scale: 1,
            opacity: 1,
        }).to(sliderElements.value[index], {
            scale: .5,
            ease: 'power4.out',
        }, '<').to(sliderElements.value[index], {
            scale: 1,
            duration: .3,
            ease: 'back',
        }, '+=.1').to(heroBackground.value, {
            scale: 2,
            onStart() {
            }
        }, '<').add(() => {
            window.open(sliderData.value[currentElement.value].externalLink, '_blank').focus();
        }, '-=.35').to(heroBackground.value, {
            backgroundColor: 'transparent',
        })
        if (!sliderData.value[currentElement.value].externalLink) return
    }

    gsap.to(window, {
        scrollTo: tl.scrollTrigger.labelToScroll('label' + index),
        duration: 1,
    });
}

function jumpOutOfSlider() {
    gsap.to(window, {
        duration: 1,
        ease: 'power4.out',
        scrollTo: document.querySelector('.section__title').offsetTop - 200
    });
}
</script>

<template>
    <div class="hero" ref="hero">
        <div class="hero__content">
            <div class="hero__background" ref="heroBackground"></div>
            <div class="slider" ref="slider">
                <SliderElement v-for="(element, index) in sliderData" :src="element.img"
                    :backgroundColor="element.backgroundColor" :borderColor="element.borderColor" :key="index"
                    @click="jumpToElement(index)"
                    :class="{ '--unpublished': (index == currentElement) && !element.externalLink }"
                    :options="sliderOptions" />
            </div>
        </div>
        <div class="hero__buttons" ref="heroButtons">
            <AppButtonSecondary :style="{ visibility: currentElement != 0 ? 'visible' : 'hidden' }"
                class="button--hero-left" :icon="ArrowLeftIcon" @click="jumpToElement(currentElement - 1)"
                visibility="low" />

            <div class="hero__button-group ">
                <AppLink v-if="sliderData[currentElement].link" :to="sliderData[currentElement].link">Ver más</AppLink>
                <AppLink v-if="sliderData[currentElement].externalLink" :to="sliderData[currentElement].externalLink"
                    :icon="ArrowTopRightOnSquareIcon" @click.prevent='jumpToElement(currentElement)'>
                    Visitar {{ sliderData[currentElement].title }}</AppLink>
                <AppFakeButton v-else theme="warning">No publicada</AppFakeButton>
                <AppLinkSecondary :to="sliderData[currentElement].img" :icon="PhotoIcon">
                    Ver</AppLinkSecondary>
                <AppButtonSecondary v-if="currentElement == sliderData.length - 1" :icon="ArrowDownIcon"
                    @click="jumpOutOfSlider" class="button--habilities">Habilidades</AppButtonSecondary>
            </div>

            <AppButtonSecondary :style="{ visibility: currentElement < sliderData.length - 1 ? 'visible' : 'hidden' }"
                class="button--hero-right" :icon="ArrowRightIcon" @click="jumpToElement(currentElement + 1)"
                visibility="low" />
        </div>
    </div>
</template>

<style>
.hero {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.hero__background {
    position: absolute;
    inset: 2rem 10% 0;
    /* opacity: .2; */
    border-radius: 100vmax;
}

.hero__content {
    height: 100%;
    padding: 2rem;
    padding-bottom: 0;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    position: relative;
}

.slider {
    display: flex;
    flex-wrap: nowrap;
    gap: v-bind('sliderOptions.gap + "rem"');
    margin-left: calc(50% - v-bind('(sliderOptions.maxWidth / 2) + "rem"'));
}

.--unpublished {
    pointer-events: none;
}

.hero__buttons {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

.hero__button-group {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}


@media (max-width: 768px) {
    .hero__buttons {
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-areas:
            'a a a'
            'b c d';
        align-items: center;
    }

    .hero__button-group {
        display: contents;
    }

    .hero__button-group :first-child {
        grid-area: a;
    }

    .button--hero-left {
        grid-area: b;
    }

    .button--hero-right {
        grid-area: d;
    }

    .button--habilities {
        grid-area: c / d;
    }

    .link,
    .button {
        justify-content: center;
    }
}
</style>