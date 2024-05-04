<template>
    <AppSection class="habilidades">
        <h2 class="section__title">Habilidades</h2>

        <table class="table">
            <tbody>
                <tr class="table__row">
                    <td class="table__left">
                        <TextWithStars :stars="4">
                            <AppTextSecondary>&lt;</AppTextSecondary>html<AppTextSecondary>&gt;</AppTextSecondary>
                        </TextWithStars>
                    </td>
                    <td class="table__center" colspan="2">
                        <TextWithStars :stars="4">
                            <AppTextSecondary>.</AppTextSecondary>css
                        </TextWithStars>
                    </td>
                    <td class="table__right">
                        <TextWithStars :stars="4">
                            <AppTextSecondary>let</AppTextSecondary> js
                        </TextWithStars>
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left">
                        <TextWithStars :stars="3">
                            <AppTextSecondary>&lt;?</AppTextSecondary>php
                        </TextWithStars>
                    </td>
                    <td class="table__center" colspan="2">
                        <TextWithStars :stars="3">
                            <AppTextSecondary>SELECT</AppTextSecondary> mysql
                        </TextWithStars>
                    </td>
                    <td class="table__right">
                        <TextWithStars :stars="3">
                            WordPress
                        </TextWithStars>
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left">
                        <TextWithStars :stars="2">
                            <AppTextSecondary>ref('</AppTextSecondary>vue<AppTextSecondary>')</AppTextSecondary>
                        </TextWithStars>
                    </td>
                    <td class="table__center">
                        <TextWithStars :stars="2">
                            <AppTextSecondary>type</AppTextSecondary> TypeScript
                        </TextWithStars>
                    </td>
                    <td class="table__center">
                        <TextWithStars :stars="2">
                            Nuxt
                        </TextWithStars>
                    </td>
                    <td class="table__right">
                        <TextWithStars :stars="2">
                            PocketBase
                        </TextWithStars>
                    </td>
                </tr>

                <tr class="table__row">
                    <td class="table__left" colspan="3">
                        <TextWithStars :stars="1">
                            <AppTextSecondary>@</AppTextSecondary>Angular<AppTextSecondary>()</AppTextSecondary>
                        </TextWithStars>
                    </td>
                    <td class="table__right">
                        <TextWithStars :stars="1">
                            Firebase
                        </TextWithStars>
                    </td>
                </tr>
            </tbody>
        </table>
    </AppSection>
</template>