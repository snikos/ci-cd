<template>
  <div class="row">
    <div class="col-12">
      <h3>Nvm (Node Version Manager)</h3>
    </div>
    <div class="col-12">
      <div class="list-group list-group-horizontal">
        <a 
          class="list-group-item list-group-item-action list-group-item-primary" 
          href="https://github.com/coreybutler/nvm-windows&client=webapp">
            nvm-windows Download and Install
        </a>
        <a 
        class="list-group-item list-group-item-action list-group-item-success" 
        href="https://coderlessons.com/articles/veb-razrabotka-articles/ustanovka-neskolkikh-versii-node-js-s-pomoshchiu-nvm">
          Instruction
        </a>
        <a 
          class="list-group-item list-group-item-action list-group-item-dark" 
          href="https://ask-dev.ru/info/56493/how-to-completely-remove-nodejs-from-windows">
            Delete All Nodejs. Clean up System
        </a>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
      <div class="list-group">
        <div class="list-group-item text-left">
          <span>установка</span> -
          <code>nvm install 8.9.4</code>
        </div>
        <div class="list-group-item text-left">
          <span>последняя Нода</span> -
          <code>nvm install latest</code>
        </div>
        <div class="list-group-item text-left">
          <span>удаление Ноды</span> -
          <code>nvm uninstall 0.11</code>
        </div>
        <div class="list-group-item text-left">
          <span>последний патч</span> -
          <code>nvm install 8.9</code>
        </div>
        <div class="list-group-item text-left">
          <span>Установка Ноды 9.0.0 и переустановка npm 8.9</span> -
          <code>nvm install v9.0.0 --reinstall-packages-from=8.9</code>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
      <div class="list-group">
        <div class="list-group-item text-left">
          <span>список</span> -
          <code>nvm list</code>
        </div>
        <div class="list-group-item text-left">
          <span>список доступных версий</span> -
          <code>nvm list available</code>
        </div>
        <div class="list-group-item text-left">
          <span>список скаченных версий</span> -
          <code>nvm list installed</code>
        </div>
        <div class="list-group-item text-left">
          <span>node</span> -
          <code>node -v</code>
        </div>
      </div>
        <div class="list-group-item text-left">
          <span>npm</span> -
          <code>npm -v</code>
        </div>
    </div>
    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4">
      <div class="list-group">
        <div class="list-group-item text-left">
          <span>текущая версия комманды</span> -
          <code>nvm current</code>
        </div>
        <div class="list-group-item text-left">
          <span>Использование NVM и список версий</span> -
          <code>nvm use node nvm ls</code>
        </div>
        <div class="list-group-item text-left">
          <span>список Нод установленных в системе</span> -
          <code>nvm ls</code>
        </div>
        <div class="list-group-item text-left">
          <span>перейти на Node.js версии 8.9.4</span> -
          <code>nvm use 8.9.4</code>
        </div>
        <div class="list-group-item text-left">
          <span>перейти на последнюю версию Node.js</span> -
          <code>nvm use node</code>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NvmWindows',
  }
</script>