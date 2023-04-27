<script setup>

function getDateDiff(from, to = Date.now()) {
    from = new Date(from)
    to = new Date(to)

    const year = { value: 31536000000, singular: 'año', plural: 'años' }
    const month = { value: 2592000000, singular: 'mes', plural: 'meses' }

    const diff = Math.abs(to - from)
    let diffMonths = Math.floor(diff / month.value)
    let diffYears = Math.floor(diffMonths / 12)
    diffMonths = diffMonths - diffYears * 12

    return diffYears > 0
        ? `${diffYears} ${pluralize(diffYears, year)} y ${diffMonths} ${pluralize(diffMonths, month)}`
        : `${diffMonths} ${pluralize(diffMonths, month)}`
}

function pluralize(number, { singular, plural }) {
    return number == 1
        ? singular
        : plural
}

</script>

<template>
    <AppSection class="experiencia">
        <h2 class="section__title">Experiencia</h2>
        <table class="table">
            <tbody>
                <tr class="table__row">
                    <td class="table__title">The Last Dock</td>
                    <td class="table__info">Enero 2023 - Actualmente ({{ getDateDiff('2023-01-09') }})</td>
                    <td class="table__content">
                        <p>Diseño y desarrollo de páginas web en WordPress usando plantillas personalizadas (PHP, HTML, CSS,
                            JS) o Elementor, según se requiera.</p>
                        <p>Desarrollo de plugins y soluciones para WordPress.</p>
                        <p>Diseño y desarrollo de pequeñas aplicaciones web para cubrir todas las necesidades de los
                            clientes (Nuxt 3, Vue 3, Firebase).</p>
                    </td>
                </tr>
                <tr class="table__row">
                    <td class="table__title">DocPath</td>
                    <td class="table__info">Enero 2021 - Octubre 2022 (1 año y 9 meses)</td>
                    <td class="table__content">
                        <p>Diseño y maquetación de contenidos: presentaciones, documentos, folletos, carteles, ...</p>
                        <p>Diseño, desarrollo y mantenimiento de páginas web:<br />- Wordpress + DIVI<br />- Tema
                            personalizado en Wordpress (PHP, JS, HTML, CSS, MySQL, Woocommerce)</p>
                        <p>Diseño y desarrollo de pequeñas aplicaciones (JS, HTML, CSS)</p>
                        <p>Diseño y prototipado de aplicaciones (JS, HTML, CSS, Bootstrap)</p>
                        <p>Diseño y desarrollo de nueva aplicación (Vue 3, Firebase)</p>
                    </td>
                </tr>
                <tr class="table__row">
                    <td class="table__title">Ibermática</td>
                    <td class="table__info">Septiembre 2020 - Enero 2021 (4 meses)</td>
                    <td class="table__content">
                        <p>Añadir pequeñas funcionalidades y corregir errores en una gran aplicación web creada para
                            usarse en Internet Explorer.</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </AppSection>
</template>