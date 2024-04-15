<template>
  <Disclosure as="nav">
    <div class="sm:px-2">
      <div class="relative flex h-12 items-center justify-between">
        <div class="flex flex-1 sm:justify-start">
          <div class="flex items-center">
            <a href="/">
              <img
                class="block dark:hidden h-8 w-auto"
                src="/logo.png"
                alt="Où sortir avec mon bébé ?"
              />
              <img
                class="hidden dark:block h-8 w-auto"
                src="/logo-for-dark-mode.png"
                alt="Où sortir avec mon bébé ?"
              />
            </a>
          </div>
          <div class="px-4">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-green-900 text-white'
                    : 'text-green-900 dark:text-white hover:bg-green-700 hover:text-white',
                  'rounded-md px-3 py-2 text-sm font-medium'
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center sm:static sm:inset-auto">
          <button
            type="button"
            class="rounded-full bg-green-800 hover:text-white focus:outline-none"
          >
            <a href="/a-propos" class="text-white"
              ><QuestionMarkCircleIcon class="h-6 w-6" aria-hidden="true"
            /></a>
          </button>
        </div>
      </div>
    </div>
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [{ name: 'Proposer un lieu', href: '/proposer-un-lieu', current: false }]
</script>
