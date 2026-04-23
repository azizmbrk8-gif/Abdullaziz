import "./index.css";
import { Composition } from "remotion";
import { HelloWorld, myCompSchema } from "./HelloWorld";
import { Logo, myCompSchema2 } from "./HelloWorld/Logo";
import { ProChainPromo } from "./ProChain/ProChainPromo";
import { ProChainPromoV2 } from "./ProChain/ProChainPromoV2";
import { ProChainTikTok } from "./ProChain/ProChainTikTok";
import {
  arBuyerConfig,
  arSupplierConfig,
  enBuyerConfig,
  enSupplierConfig,
  totalFrames,
} from "./ProChain/configs";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProChainBuyerEN"
        component={ProChainPromoV2}
        durationInFrames={totalFrames(enBuyerConfig)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: enBuyerConfig }}
      />
      <Composition
        id="ProChainSupplierEN"
        component={ProChainPromoV2}
        durationInFrames={totalFrames(enSupplierConfig)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: enSupplierConfig }}
      />
      <Composition
        id="ProChainBuyerAR"
        component={ProChainPromoV2}
        durationInFrames={totalFrames(arBuyerConfig)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: arBuyerConfig }}
      />
      <Composition
        id="ProChainSupplierAR"
        component={ProChainPromoV2}
        durationInFrames={totalFrames(arSupplierConfig)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ config: arSupplierConfig }}
      />
      <Composition
        id="ProChainPromo"
        component={ProChainPromo}
        durationInFrames={645}
        fps={30}
        width={1080}
        height={1920}
      />
      {/* TikTok restaurant owner video — 40s / 1080×1920 */}
      <Composition
        id="ProChainTikTokWithAudio"
        component={ProChainTikTok}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ enableAudio: true }}
      />
      <Composition
        id="ProChainTikTokMuted"
        component={ProChainTikTok}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ enableAudio: false }}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema}
        defaultProps={{
          titleText: "Welcome to Remotion",
          titleColor: "#000000",
          logoColor1: "#91EAE4",
          logoColor2: "#86A8E7",
        }}
      />
      <Composition
        id="OnlyLogo"
        component={Logo}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        schema={myCompSchema2}
        defaultProps={{
          logoColor1: "#91dAE2" as const,
          logoColor2: "#86A8E7" as const,
        }}
      />
    </>
  );
};
