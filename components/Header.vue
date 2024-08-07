<template>
  <header
    class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4"
  >
    <div class="relative ml-auto flex-1 md:grow-0">
      <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
      />
    </div>
  </header>
</template>
