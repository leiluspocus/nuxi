<script setup>
import { GeocoderAutocomplete } from '@geoapify/geocoder-autocomplete'
import { ref, onMounted } from 'vue'
import { insertSpot } from '../api/spots'
import SpotsAutocomplete from '../organisms/SpotsAutocomplete.vue'
import SuccessNotification from '../molecules/SuccessNotification.vue'
import ErrorNotification from '../molecules/ErrorNotification.vue'

let newProposal = ref({})
const friendlyStaff = ref(false)
const diaperFacilities = ref(false)
const pmrAccess = ref(false)
const feedback = ref('')
const success = ref(false)
const error = ref(false)
const isSubmissionLoading = ref(false)

const selectSuggestion = (item) => {
  newProposal.value = item
}

const submitForm = async (e) => {
  event.preventDefault()
  const { value } = newProposal
  isSubmissionLoading.value = true
  const res = await insertSpot({
    name: value.name,
    address: value.address_line2,
    lat: value.lat,
    lng: value.lon,
    postal_code: value.postcode,
    city: value.city,
    stroller_access: pmrAccess.value,
    changing_table: diaperFacilities.value,
    friendly_staff: friendlyStaff.value
  })
  success.value = res
  error.value = !res
  isSubmissionLoading.value = false
  setTimeout(() => (success.value = false), 5000)
}
</script>
<template>
  <form class="px-4 pb-4 content content-with-text">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h1 class="text-base font-semibold leading-7 text-gray-900 mt-3 dark:text-white">
          Proposer un endroit "bébé-friendly"
        </h1>
        <div class="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="col-span-full">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
              >Nom et adresse du lieu que vous recommandez ?</label
            >
            <div class="mt-2">
              <spots-autocomplete :new-proposal="newProposal" @value-selected="selectSuggestion" />
            </div>
          </div>
        </div>
      </div>
      <div class="border-b border-gray-900/10 pb-12">
        <div class="mt-10 space-y-10">
          <fieldset>
            <legend class="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Les plus "Bébé Friendly"
            </legend>
            <div class="mt-6 space-y-6">
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    v-model="diaperFacilities"
                  />
                </div>
                <div class="text-sm leading-6">
                  <label for="comments" class="font-medium text-gray-900 dark:text-gray-400"
                    >Table à langer</label
                  >
                  <p class="text-gray-500">Y a-t-il de quoi changer les p'tits bouts ?</p>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    v-model="pmrAccess"
                  />
                </div>
                <div class="text-sm leading-6">
                  <label for="candidates" class="font-medium text-gray-900 dark:text-gray-400"
                    >Accès pousettes</label
                  >
                  <p class="text-gray-500">
                    Est-ce facile de se déplacer en poussette dans l'établissement ?
                  </p>
                </div>
              </div>
              <div class="relative flex gap-x-3">
                <div class="flex h-6 items-center">
                  <input
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    v-model="friendlyStaff"
                  />
                </div>
                <div class="text-sm leading-6">
                  <label for="offers" class="font-medium text-gray-900 dark:text-gray-400"
                    >Staff bienveillant</label
                  >
                  <p class="text-gray-500">
                    Qu'ils braillent ou qu'ils fassent risette, est-ce que l'équipe est agréable
                    avec les tous petits ?
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-8 col-span-full">
              <label
                for="feedback"
                class="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
                >Votre opinion</label
              >
              <div class="mt-2">
                <textarea
                  id="feedback"
                  name="feedback"
                  v-model="feedback"
                  rows="3"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
              <p class="mt-3 text-sm leading-6 text-gray-600">
                Pourquoi recommandez vous ce lieu en quelques mots.
              </p>
            </div>
          </fieldset>
        </div>
      </div>
    </div>

    <div class="mt-3 flex items-center justify-end gap-x-6 relative">
      <button
        type="submit"
        v-if="!isSubmissionLoading"
        class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        @click="submitForm"
      >
        Envoyer
      </button>
      <button
        v-if="isSubmissionLoading"
        disabled
        type="button"
        class="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 inline-flex items-center"
      >
        <svg
          aria-hidden="true"
          role="status"
          class="inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
        Loading...
      </button>
      <success-notification
        :msg="'Merci pour votre suggestion, nous l\'avons bien reçu! Elle sera traitée prochainement :)'"
        :success="success"
      />
      <error-notification :msg="'Erreur à la soumission'" :error="error" />
    </div>
  </form>
</template>

<style>
.addview {
  width: 600px;
  height: 600px;
}
</style>
