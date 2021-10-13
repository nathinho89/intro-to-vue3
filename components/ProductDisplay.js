app.component('product-display', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: 
    /* html */
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <img :src="image" :alt="description">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <p>
          <strong v-if="inventory > 10">In Stock</strong>
          <strong v-else-if="inventory <= 10 && inventory > 0">Almost sold out</strong>
          <strong v-else>Out of Stock</strong>
          <span v-show="inventory <= 10 && inventory > 0"> - only {{ inventory }} left</span>
        </p>
        <p>Shipping is {{ shipping }}</p>
        <p>{{ description }}</p>

        <product-details :details="details"></product-details>
        
        <div v-for="(variant, index) in variants" 
            @mouseover="updateVariant(index)"
            :key="variant.id" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          <!-- <select>
            <option v-for="size in variant.sizes">
              {{ size }}
            </option>
          </select> -->
        </div>
        <button class="button" 
               :class="{ disabledButton: inventory <= 0 || cart >= inventory }"
               :disabled="inventory <= 0 || cart >= inventory"
               @click="addToCart()" 
        >
           Add to Cart
        </button>
        <button class="button"     
              :class="{ disabledButton: cart < 1 }"         
                :disabled="cart < 1"
                @click="removeFromCart()"
                >
           Remove From Cart
        </button>
      </div>

      <review-list :reviews="reviews" v-if="reviews.length"></review-list>
      <review-form @review-submitted="addReview"></review-form>

    </div>
  </div>`,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        description: 'A pair of fluffy socks.',
        selectedVariant: 0,
        onSale: true,
        details: ['50% cotton', '30% wool', '20% polyester'],
        variants: [
            { 
                id: 100, color: 'green', image: './assets/images/socks_green.jpg', quantity: 5,
                sizes: [
                    'small', 'medium', 'large'
                ]
            },
            { 
                id: 101, color: 'blue', image: './assets/images/socks_blue.jpg', quantity: 0,
                sizes: [
                    'small', 'medium', 'large'
                ]
            }
        ],
        styles: {
            color: 'red',
            fontSize: '14px'
        },
        reviews: []
    }
},
methods: {
    addToCart() {
        //this.cart += 1
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    addReview(review) {
        this.reviews.push(review)
    },
    removeFromCart() {
        //this.cart -= this.cart > 0 ? 1 : 0
        this.$emit('remove-from-cart')
    },
    updateVariant(index) {
        this.selectedVariant = index
    }
},
computed : {
    title() {
        return this.onSale ? this.brand + ' ' + this.product + ' is on sale' : this.brand + ' ' + this.product;
    },
    image() {
        return this.variants[this.selectedVariant].image
    },
    inventory() {
        return this.variants[this.selectedVariant].quantity;
    },
    shipping() {
        return this.premium ? 'free' : '£2.99';
    }
}
});