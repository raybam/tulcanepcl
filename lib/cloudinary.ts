// Client-safe Cloudinary configuration and URL builder
export const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
  process.env.CLOUDINARY_CLOUD_NAME ||
  "";


export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: string;
  quality?: string | number;
  format?: string;
}

/**
 * Builds an optimized Cloudinary delivery URL or falls back gracefully
 * to a local / custom URL if Cloudinary is not yet configured.
 */
export function getCloudinaryUrl(
  publicIdOrUrl: string,
  fallbackUrl: string = "",
  options?: CloudinaryTransformOptions
): string {
  // If no ID or URL provided, return fallback
  if (!publicIdOrUrl) return fallbackUrl;

  // If it's already an absolute URL (e.g. from Google or previous Cloudinary upload)
  if (
    publicIdOrUrl.startsWith("http://") ||
    publicIdOrUrl.startsWith("https://") ||
    publicIdOrUrl.startsWith("data:")
  ) {
    return publicIdOrUrl;
  }

  // If Cloud Name is configured, build Cloudinary CDN URL
  if (CLOUD_NAME) {
    const transforms: string[] = ["f_auto", "q_auto"];
    if (options?.width) transforms.push(`w_${options.width}`);
    if (options?.height) transforms.push(`h_${options.height}`);
    if (options?.crop) transforms.push(`c_${options.crop}`);
    if (options?.quality) transforms.push(`q_${options.quality}`);
    if (options?.format) transforms.push(`f_${options.format}`);

    const transformString = transforms.join(",");
    const cleanPublicId = publicIdOrUrl.replace(/^\/+/, "");
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformString}/${cleanPublicId}`;
  }

  // Fallback to local image URL
  return fallbackUrl || (publicIdOrUrl.startsWith("/") ? publicIdOrUrl : `/${publicIdOrUrl}`);
}

/**
 * Pre-mapped asset catalog for sections and downloads
 */
export const SECTION_ASSETS = {
  heroSlide1: {
    publicId: "tulcan_energy/hero-1",
    fallback: "/images/hero-1.jpg",
  },
  heroSlide2: {
    publicId: "tulcan_energy/hero-2",
    fallback: "/images/hero-2.jpg",
  },
  heroSlide3: {
    publicId: "tulcan_energy/hero-3",
    fallback: "/images/hero-3.jpg",
  },
  heroSlide4: {
    publicId: "https://res.cloudinary.com/xh7slab6/image/upload/v1789934090/tulcan_energy/hero-4.jpg",
    fallback: "/images/hero-4.jpg",
  },
  headerCorporate: {
    publicId: "tulcan_energy/header-corporate",
    fallback: "/images/header-corporate.jpg",
  },
  headerHse: {
    publicId: "tulcan_energy/header-hse",
    fallback: "/images/header-hse.jpg",
  },
  headerCsr: {
    publicId: "tulcan_energy/header-csr",
    fallback: "/images/header-csr.jpg",
  },
  headerEsg: {
    publicId: "tulcan_energy/header-esg",
    fallback: "/images/header-esg.jpg",
  },
  logo: {
    publicId: "tulcan_energy/logo",
    fallback: "/images/logo.png",
  },
  logoWhite: {
    publicId: "tulcan_energy/logo-white",
    fallback: "/images/logo-white.png",
  },
  companyProfilePdf: {
    publicId: "tulcan_energy/company-profile",
    fallback: "/docs/Tulcan_Energy_Company_Profile.pdf",
  },
};
