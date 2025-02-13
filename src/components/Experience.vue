<template>
  <div class="error-404-container">
    <div class="error-card">
      <h1>{{ $t("experienceNotFound") }}</h1>
      <p>{{ $t("experienceText") }}</p>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "Experience404",
  setup() {
    const { t } = useI18n();
    return { t };
  }
};
</script>

<style scoped>
.error-404-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  min-height: 300px;
}

.error-card {
  position: relative;
  background-color: rgba(255, 77, 77, 0.66);
  color: #ffffff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-card h1 {
  font-size: 2rem;
  margin-bottom: 12px;
}

.error-card p {
  font-size: 1.2rem;
  margin: 8px 0;
}
</style>
