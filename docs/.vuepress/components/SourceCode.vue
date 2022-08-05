<!-- SourceCode.vue -->
<template>
  <div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>Mostrar Código</v-expansion-panel-header>
        <v-expansion-panel-content>
          <slot></slot>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
