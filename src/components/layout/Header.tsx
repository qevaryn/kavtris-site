import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { HeaderNav } from '@/components/layout/HeaderNav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#10273A] text-white">
      <div className="mx-auto flex min-h-[72px] max-w-[1280px] items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8 xl:min-h-[76px]">
        <Link href="/#inicio" className="flex min-w-0 items-center gap-4" aria-label="KAVTRIS — Technology & Consulting">
          {/* WEB.1F.2 — owner-approved horizontal web lockup PNG
              (KAVTRIS symbol + wordmark + TECHNOLOGY & CONSULTING). The image is
              decorative here: the link label carries the accessible brand name
              (single clean semantic strategy, no duplicate announcement). */}
          <Image
            src="/brand/kavtris/kavtris-technology-consulting-lockup.png"
            alt=""
            width={2071}
            height={686}
            priority
            sizes="(max-width: 430px) 140px, (max-width: 768px) 148px, (max-width: 1024px) 154px, (max-width: 1440px) 166px, 170px"
            className="h-auto w-[140px] shrink-0 object-contain min-[430px]:w-[148px] sm:w-[154px] lg:w-[160px] xl:w-[166px] 2xl:w-[170px]"
          />
          <span data-testid="header-network-signature" className="hidden items-center gap-3 border-l border-kavtris-blue/55 pl-4 text-[0.62rem] font-bold uppercase leading-4 tracking-[0.17em] text-white/58 min-[1320px]:inline-flex">
            <span>
              Integrante da
              <span className="block text-white/72">Rede Qualidade é Vida</span>
            </span>
          </span>
        </Link>

        <HeaderNav />

        <div className="flex items-center gap-2.5">
          <Button
            href="/#contacto"
            className="hidden border border-kavtris-blueLight/80 bg-kavtris-blue px-5 py-2.5 text-white shadow-[0_10px_26px_rgba(6,90,253,0.28)] transition hover:border-kavtris-blueLight hover:bg-[#0B5EFF] hover:shadow-[0_14px_30px_rgba(6,90,253,0.36)] min-[1180px]:inline-flex"
          >
            Pedir demonstração
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}