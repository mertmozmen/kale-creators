/** GitHub Pages alt dizini (NEXT_PUBLIC_BASE_PATH) için statik dosya yolu. Link/router zaten basePath ekler; <img> ve metadata eklemez. */
export const medyaYolu = (yol: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${yol}`;
