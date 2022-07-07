<template>
  <div class="switch-box">
    <input type="checkbox" id="switch" :checked="checked" @change="e => $emit('change', e.target.checked)"/>
    <label for="switch" />
    <div class="text"><slot>Toggle</slot></div>
  </div>
</template>

<script>
export default {
  emits: ['change'],
  props: ['checked']
}
</script>

<style scoped>
.switch-box {
  display: flex;
  flex-direction: row;
}

.text {
  font-size: 20px;
  line-height: 28px;
  margin-left: 10px;
  user-select: none;
}

input[type=checkbox]{
  height: 0;
  width: 0;
  display: none;
}

label {
  cursor: pointer;
  width: 60px;
  height: 30px;
  background: var(--color-2);
  display: block;
  border-radius: 30px;
  position: relative;
}

label:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 24px;
  height: 24px;
  background: var(--color-5);
  border-radius: 25px;
  transition: 0.4s;
}

input:checked + label {
  background: var(--color-1);
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 40px;
}

@media (max-width: 1024px) {
  label {
    cursor: default;
  }
}
</style>
