app.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: 
    /* html */
    `<ul>
      <li v-for="detail in details" :style="styles">
        {{ detail }}
      </li>
    </ul>`
});