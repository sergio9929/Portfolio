<template>
    <AppSection class="habilidades">
        <h2 class="section__title">Habilidades</h2>

        <table class="table">
            <tbody>
                <tr class="table__row">
                    <td class="table__title">Lenguajes</td>
                    <td class="table__info">
                        <div class="flex-container">
                            <span>
                                <AppTextSecondary>&lt;</AppTextSecondary>html<AppTextSecondary>&gt;</AppTextSecondary>
                            </span>
                            <span>
                                <AppTextSecondary>let</AppTextSecondary> js
                            </span>
                            <span>
                                <AppTextSecondary>.</AppTextSecondary>css
                            </span>
                            <span>
                                <AppTextSecondary>type</AppTextSecondary> TypeScript
                            </span>
                            <span>
                                <AppTextSecondary>SELECT</AppTextSecondary> sql
                            </span>
                            <span>
                                <AppTextSecondary>&lt;?</AppTextSecondary>php
                            </span>
                        </div>
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__title">Herramientas</td>
                    <td class="table__info">
                        <div class="flex-container">
                            <span>Node</span>
                            <span>
                                <AppTextSecondary>ref('</AppTextSecondary>vue<AppTextSecondary>')</AppTextSecondary>
                            </span>
                            <span>Nuxt</span>
                            <span>
                                <AppTextSecondary>@</AppTextSecondary>Angular<AppTextSecondary>()</AppTextSecondary>
                            </span>
                            <span>Capacitor</span>
                            <span>PocketBase</span>
                            <span>WordPress</span>
                            <span>Git</span>
                            <span>Docker</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </AppSection>
</template>

<style scoped>
.flex-container {
    justify-content: flex-end;
}
</style>