<template>
  <div>
    <nav>
      <ul>
        <li><NuxtLink to="/">Фильмы</NuxtLink></li>
        <li><NuxtLink to="/cinema">Кинотеатры</NuxtLink></li>
        <li><NuxtLink to="/tickets">Мои билеты</NuxtLink></li>
        <li><NuxtLink to="/authorization">Вход</NuxtLink></li>
      </ul>
    </nav>
    <slot />
  </div>
</template>
