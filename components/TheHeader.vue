<template>
    <header class="header">
        <nav class="nav">
            <ul class="nav__list">
                <li class="nav__item">
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li class="nav__item">
                    <NuxtLink to="/doc">Docs</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style>
.header {
    position: fixed;
    bottom: 0;
    right: 0;
    padding: 2rem;
    z-index: 999;
}

.nav {
    background-color: var(--primary-color);
    color: var(--base-color);
    padding: .5em 1em;
    border-radius: 1em;
}

.nav__list {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    gap: .5em;
}

.nav__item a {
    text-decoration: none;
}

.nav__item a:where(:hover, :focus) {
    text-decoration: underline;
}

.nav__item:not(:first-of-type)::before {
    content: '|';
    margin-right: .5em;
}

</style>