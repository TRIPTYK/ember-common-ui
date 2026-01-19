import type { TOC } from "@ember/component/template-only";

interface Args {
  labelText: string;
}

const template: TOC<Args> = <template>
  <label>BEST LABEL EVER: {{@labelText}}</label>
</template>;

export default template;
