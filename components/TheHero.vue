<script setup>
import { ArrowRightIcon, ArrowLeftIcon, ArrowDownIcon, ArrowTopRightOnSquareIcon, PhotoIcon } from '@heroicons/vue/24/outline'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Draggable } from "gsap/Draggable";

const hero = ref(null)
const heroContainer = ref(null)
const heroContent = ref(null)
const heroButtons = ref(null)
const slider = ref(null)
const sliderElements = computed(() => slider.value?.querySelectorAll('.element') || [])

let tl = null
let tlFinal = null

const currentElement = useCurrentElement()
const headerTheme = useHeaderTheme()
const heroInViewport = ref(false)
const sliderOptions = ref({
    width: 40,
    gap: 1,
})
const sliderData = ref([{
    img: 'Imagen 1.png',
    backgroundColor: '#434343',
    theme: 'dark',
    borderColor: '',
    link: '',
    externalLink: 'https://www.mnker.com/',
    title: 'Mnker',
}, {
    img: 'Imagen 2.png',
    backgroundColor: '#F8E6CF',
    theme: '',
    borderColor: '',
    link: '',
    externalLink: 'https://vivebenalmadena.com/',
    title: 'Vive Benalmadena',
}, {
    img: 'Imagen 3.png',
    backgroundColor: '#b6d1e7',
    theme: '',
    borderColor: '#fff',
    link: '',
    externalLink: 'https://valpatek.com/',
    title: 'Valpatek',
}, {
    img: 'Imagen 6.png',
    backgroundColor: '#ddddef',
    theme: '',
    borderColor: '#fff',
    link: '',
    externalLink: '',
    title: '',
}, {
    img: 'Imagen 4.png',
    backgroundColor: '#305888',
    theme: 'dark',
    borderColor: '#fff',
    link: '',
    externalLink: '',
    title: '',
}, {
    img: 'Imagen 5.png',
    backgroundColor: '#282828',
    theme: 'dark',
    borderColor: '#fff',
    link: '',
    externalLink: '',
    title: '',
}])
headerTheme.value = computed(() => sliderData.value[currentElement.value].theme)

watch(sliderElements, () => {
    if (sliderElements.value.length == sliderData.value.length) {
        console.log('Hero animations: ✨')
        loadAnimations()
    }
})

async function loadAnimations() {
    await nextTick();

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

    tl = gsap.timeline({
        paused: true,
        defaults: {
            duration: 5,
            ease: 'none',
        }
    });
    tlFinal = gsap.timeline();
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: `(min-width: 769px)`,
        isMobile: `(max-width: 768px)`,
        reduceMotion: "(prefers-reduced-motion: reduce)"
    }, (context) => {
        let { isDesktop, isMobile, reduceMotion } = context.conditions;

        const heroScrollTrigger = ScrollTrigger.create({
            animation: tlFinal,
            trigger: hero.value,
            pin: true,
            pinSpacing: true,
            scrub: .5,
            ease: 'power4.inOut',
            start: 'top top',
            snap: {
                snapTo: 'labels',
                delay: 0,
                duration: .5,
                inertia: false,
            },
            invalidateOnRefresh: true,
            end: () => '+=' + (sliderElements.value.length * 100) * (isDesktop ? 3 : 1),
        })

        // keep track of the scroll position to sync ScrollTrigger and Draggable
        const proxy = document.createElement('div.proxy');
        scrollUpdate()

        ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: scrollUpdate,
        });

        function scrollUpdate() {
            updateProxy()
            heroInViewport.value = false
            if (ScrollTrigger.isInViewport(document.querySelector('.startup'))) {
                headerTheme.value = computed(() => '')
                return
            }
            if (ScrollTrigger.isInViewport(hero.value)) {
                headerTheme.value = computed(() => sliderData.value[currentElement.value].theme)
                heroInViewport.value = true
                return
            }

            headerTheme.value = computed(() => '')
        }

        function updateProxy() {
            if (heroScrollTrigger) {
                gsap.set(proxy, { x: -heroScrollTrigger.scroll() / 1.5, overwrite: 'auto' });
            }
        }

        const heroDraggable = Draggable.create(proxy, {
            trigger: heroContent.value,
            type: 'x',
            onDrag() {
                heroScrollTrigger.scroll(-this.x * 1.5);
            }
        })

        if (isDesktop) {
            sliderOptions.value = {
                width: 40,
                gap: 1,
            }

            heroDraggable[0].enable()
        } else {
            sliderOptions.value = {
                width: 20,
                gap: 1,
            }

            heroDraggable[0].disable()
        }

        sliderElements.value.forEach((element, i) => {
            const background = element.querySelector('.element__background')
            const fade = element.querySelector('.element__fade')

            tl.fromTo(element, {
                zIndex: - 2 - i,
                xPercent: isDesktop ? 50 : 0,
                yPercent: isDesktop ? 0 : 70,
                scale: .5,
            }, {
                zIndex: 0,
                xPercent: 0,
                yPercent: 0,
                scale: 1,
                ease: 'power1.in',
            }, i)
                .addLabel('label-' + i, '>')
                .to(element, {
                    xPercent: isDesktop ? -50 : 0,
                    yPercent: isDesktop ? 0 : -70,
                    scale: .5,
                    ease: 'power1.out'
                }, '>')

            tl.call(() => {
                currentElement.value = i
            }, null, i + 4.5)
                .call(() => {
                    currentElement.value = i
                }, null, i + 5.5)

            tl.fromTo(background, {
                opacity: .6,
            }, {
                opacity: 0,
                yoyo: true,
                repeat: 1,
                duration: 3,
            }, i + 2)

            tl.fromTo(fade, {
                opacity: 1,
            }, {
                opacity: 0,
                yoyo: true,
                repeat: 1,
            }, i)
        });

        const pinSnappingFactor = .5
        tlFinal.add(tl.tweenFromTo('label-0', 'label-0'), '-=' + pinSnappingFactor)
            .add(tl.tweenFromTo('label-0', 'label-' + (sliderElements.value.length - 1)))
            .add(tl.tweenFromTo('label-' + (sliderElements.value.length - 1), 'label-' + (sliderElements.value.length - 1)))
            .fromTo(heroButtons.value, {
                opacity: 1,
                yPercent: 0,
            }, {
                yPercent: 100,
                opacity: 0,
                yoyo: true,
                repeat: (sliderElements.value.length * 2) - 3,
                duration: .5,
            }, pinSnappingFactor)
            .to(heroContainer.value, {
                borderRadius: '3rem',
                scale: .95,
                duration: pinSnappingFactor,
            }, '>')
            .fromTo(heroContainer.value, {
                borderRadius: '3rem',
                scale: .95,
            }, {
                borderRadius: 0,
                scale: 1,
                duration: pinSnappingFactor,
            }, 0)

        for (let i = 0; i < sliderElements.value.length; i++) {
            tlFinal.addLabel('label-' + i, i + pinSnappingFactor)
        }
    });
}

function jumpToElement(index) {
    if (index == currentElement.value) {
        if (!sliderData.value[currentElement.value].externalLink) return

        const otherElements = Array.from(sliderElements.value).filter((el, i) => i != index)
        gsap.timeline({
            defaults: {
                duration: .5,
            }
        })
            .to(sliderElements.value[index], {
                scale: 1.1,
                duration: .2,
            }, '<')
            .to(sliderElements.value[index], {
                scale: .5,
                ease: 'power4.out',
            }, '<')
            .to(sliderElements.value[index], {
                scale: 1,
                duration: .3,
                ease: 'back',
            }, '+=.1')
            .add(() => {
                window.open(sliderData.value[currentElement.value].externalLink, '_blank').focus();
            }, '-=.1')
            .to(otherElements, {
                opacity: 1,
            }, '<')
            .to(otherElements, {
                opacity: 0,
            }, '0')
    } else {
        const scrollTarget = tlFinal.scrollTrigger.labelToScroll('label-' + index),
            scrollDifference = Math.abs(window.scrollY - scrollTarget),
            scrollTotal = tlFinal.scrollTrigger.end

        gsap.to(window, {
            scrollTo: scrollTarget,
            duration: scrollDifference / scrollTotal * 1,
        });
    }
}

function jumpToHero() {
    if (!heroInViewport.value) {
        const scrollTarget = tlFinal.scrollTrigger.labelToScroll('label-0')
        gsap.to(window, {
            duration: 1,
            ease: 'power2.inOut',
            scrollTo: scrollTarget,
        });
    }

}

function jumpOutOfSlider() {
    gsap.to(window, {
        duration: 1,
        ease: 'power4.out',
        scrollTo: document.querySelector('.section').offsetTop
    });
}
</script>

<template>
    <div class="hero" ref="hero">
        <div class="hero__container" ref="heroContainer" @click="jumpToHero">
            <div class="hero__content" ref="heroContent">
                <div class="slider" ref="slider">
                    <SliderElement v-for="(element, index) in sliderData" :src="element.img"
                        :backgroundColor="element.backgroundColor" :borderColor="element.borderColor" :key="index"
                        @click="jumpToElement(index)"
                        :class="{ '--unpublished': (index == currentElement) && !element.externalLink }"
                        :options="sliderOptions" />
                </div>
            </div>
            <div class="hero__buttons">
                <AppButtonSecondary :style="{ visibility: currentElement != 0 ? 'visible' : 'hidden' }"
                    class="button--hero-left" :icon="ArrowLeftIcon" @click="jumpToElement(currentElement - 1)"
                    visibility="low" :theme="sliderData[currentElement].theme" aria-label="Proyecto anterior" />

                <div class="hero__button-group" ref="heroButtons">
                    <AppLink v-if="sliderData[currentElement].link" :to="sliderData[currentElement].link"
                        :theme="sliderData[currentElement].theme">Ver más</AppLink>
                    <AppLink v-if="sliderData[currentElement].externalLink"
                        :to="sliderData[currentElement].externalLink" :theme="sliderData[currentElement].theme"
                        :icon="ArrowTopRightOnSquareIcon" @click.prevent='jumpToElement(currentElement)'>
                        Visitar {{ sliderData[currentElement].title }}</AppLink>
                    <AppFakeButton v-else theme="warning">No publicada</AppFakeButton>
                    <AppLinkSecondary :to="sliderData[currentElement].img" :icon="PhotoIcon"
                        :theme="sliderData[currentElement].theme">
                        Ver</AppLinkSecondary>
                    <AppButton v-if="currentElement == sliderData.length - 1" :icon="ArrowDownIcon"
                        @click="jumpOutOfSlider" class="button--habilities" :theme="sliderData[currentElement].theme">
                        Habilidades</AppButton>
                </div>

                <AppButtonSecondary
                    :style="{ visibility: currentElement < sliderData.length - 1 ? 'visible' : 'hidden' }"
                    class="button--hero-right" :icon="ArrowRightIcon" @click="jumpToElement(currentElement + 1)"
                    visibility="low" :theme="sliderData[currentElement].theme" aria-label="Siguiente proyectos" />
            </div>
        </div>
    </div>
</template>

<style>
.hero {
    width: 100%;
    height: 100vh;
}

.hero__container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: v-bind('sliderData[currentElement].backgroundColor');
    transition: background-color 1s;
    border-radius: 2rem;
    scale: .95;
}

.hero__content {
    height: 100%;
    padding: 2rem;
    padding-top: 5rem;
    padding-bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 1;
}

.slider {
    width: v-bind('sliderOptions.width + "rem"');
    height: auto;
    aspect-ratio: 15 / 11;
    gap: v-bind('sliderOptions.gap + "rem"');
    display: flex;
    align-items: center;
}

.element__fade {
    transition: background-color 1s;
    background-color: v-bind('sliderData[currentElement].backgroundColor');
}

.--unpublished {
    cursor: auto;
    box-shadow: none !important;
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
    .hero__content {
        overflow: hidden;
        align-items: flex-start;
        justify-content: center;
    }

    .slider {
        width: 100%;
        flex-direction: column;
        align-items: center;
        position: relative;
        top: calc(50% - v-bind('(sliderOptions.width / 2) + "rem"'));
        margin-left: 0;
    }

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