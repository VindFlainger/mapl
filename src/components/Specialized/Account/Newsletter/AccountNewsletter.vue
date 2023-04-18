<template>
  <div>
    <div>
      <h4 class="font-weight-bold text-uppercase text-h5">{{ t('customer.newsletter.section-name') }}</h4>
    </div>

    <div class="mt-4">


      <v-row>
        <v-col class="pa-0">
          <h4>{{ t('customer.newsletter.advantages') }}</h4>
          <ul class="ml-4">
            <li>
              {{ t('customer.newsletter.advantages-list.up-to') }}
            </li>
            <li>
              {{ t('customer.newsletter.advantages-list.promotions') }}
            </li>
            <li>
              {{ t('customer.newsletter.advantages-list.delivery') }}
            </li>
          </ul>

          <v-card
              class="mt-3"
              max-width="350"
              elevation="0"
              rounded="0"
          >
            <ui-input-email v-model="email"></ui-input-email>
            <ui-button-default alternative class="mt-2">
              {{ t('common.buttons.confirm') }}
            </ui-button-default>
          </v-card>
        </v-col>

        <v-col class="pa-0">
          <v-card
              elevation="0"
              rounded="0"
              width="100%"
              class="bg-grey-lighten-3 pa-2"
          >
            <v-checkbox
                value="promotions"
                v-model="options"
                :label="t('customer.newsletter.types.promotions')"
                density="compact"
                hide-details
            ></v-checkbox>
            <v-checkbox
                value="wishlist"
                v-model="options"
                :label="t('customer.newsletter.types.wishlist')"
                density="compact"
                hide-details
            ></v-checkbox>
            <v-checkbox
                value="collections"
                v-model="options"
                :label="t('customer.newsletter.types.collections')"
                density="compact"
                hide-details
            ></v-checkbox>
          </v-card>
        </v-col>

      </v-row>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

import {useI18n} from "vue-i18n";
import {useMeta} from "vue-meta";
import UiInputEmail from "@/components/UI/Inputs/UiInputEmail.vue";
import UiButtonDefault from "@/components/UI/Buttons/UiButtonDefault.vue";

const {t} = useI18n()

useMeta({
  title: t('customer.newsletter.section-name')
})

const email = ref('')
const options = ref(['promotions', 'wishlist', 'collections'])



</script>

<style scoped>

</style>