import { getBrands } from "@/lib/firestore/brands/read";
import { getSeriesByBrand } from "@/lib/firestore/series/read";
import { getModelsBySeries } from "@/lib/firestore/models/read";

export async function getServerSideProps(context) {
  try {
    const brands = await getBrands();
    const brandId = context.query.brandId || "";
    const seriesId = context.query.seriesId || "";

    let series = [];
    let models = [];

    if (brandId) {
      series = await getSeriesByBrand(brandId);
    }
    if (brandId && seriesId) {
      models = await getModelsBySeries(brandId, seriesId);
    }

    return {
      props: {
        brands,
        series,
        models,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        brands: [],
        series: [],
        models: [],
      },
    };
  }
}