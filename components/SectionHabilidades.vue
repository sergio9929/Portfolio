<template>
    <AppSection class="habilidades">
        <h2 class="section__title">Habilidades</h2>

        <table class="table">
            <tbody>
                <tr class="table__row">
                    <td class="table__left">
                        <AppTextSecondary>&lt;</AppTextSecondary>html <AppTextSecondary>/></AppTextSecondary>
                        <AppStar v-for="n in 4" />
                    </td>
                    <td class="table__center" colspan="2">
                        <AppTextSecondary>.</AppTextSecondary>css
                        <AppStar v-for="n in 4" />
                    </td>
                    <td class="table__right">
                        <AppTextSecondary>let</AppTextSecondary> js
                        <AppStar v-for="n in 4" />
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left">
                        <AppTextSecondary>&lt;?</AppTextSecondary>php
                        <AppStar v-for="n in 3" />
                    </td>
                    <td class="table__center" colspan="2">
                        <AppTextSecondary>SELECT</AppTextSecondary> mysql
                        <AppStar v-for="n in 3" />
                    </td>
                    <td class="table__right">WordPress
                        <AppStar v-for="n in 3" />
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left">
                        <AppTextSecondary>ref('</AppTextSecondary>vue<AppTextSecondary>')</AppTextSecondary>
                        <AppStar v-for="n in 2" />
                    </td>
                    <td class="table__center">
                        <AppTextSecondary>type</AppTextSecondary> TypeScript
                        <AppStar v-for="n in 2" />
                    </td>
                    <td class="table__center">Nuxt
                        <AppStar v-for="n in 2" />
                    </td>
                    <td class="table__right">PocketBase
                        <AppStar v-for="n in 2" />
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left" colspan="3">
                        <AppTextSecondary>@</AppTextSecondary>Angular<AppTextSecondary>()</AppTextSecondary>
                        <AppStar />
                    </td>
                    <td class="table__right">Firebase
                        <AppStar />
                    </td>
                </tr>
            </tbody>
        </table>
    </AppSection>
</template>