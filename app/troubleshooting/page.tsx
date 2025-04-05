import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TroubleshootingPage() {
  return (
    <div className="container py-12">
      <Link href="/market" className="inline-flex items-center text-muted-foreground hover:text-primary mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Market
      </Link>

      <h1 className="text-3xl font-pixel mb-6">Troubleshooting Guide</h1>

      <div className="minecraft-card p-6 mb-8">
        <h2 className="text-xl font-pixel mb-4">Common Installation Issues</h2>

        <div className="space-y-6">
          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">Translation Pack Not Showing Up</h3>
            <p className="mb-2">If your translation pack is not appearing in Minecraft after installation:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Make sure you've imported the pack correctly through the Global Resources menu</li>
              <li>Check that the pack is activated (toggle should be on)</li>
              <li>Restart Minecraft completely</li>
              <li>Verify that your Minecraft version is compatible with the translation pack</li>
            </ol>
          </div>

          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">Text Still Appears in English</h3>
            <p className="mb-2">If some text is still appearing in English after installing the translation:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if you have multiple resource packs active that might be conflicting</li>
              <li>Make sure the translation pack is at the top of your active resource packs list</li>
              <li>Some custom content may not be covered by the translation pack</li>
              <li>Try reinstalling the translation pack</li>
            </ol>
          </div>

          <div>
            <h3 className="font-pixel text-lg text-primary mb-2">Corrupted or Broken Text</h3>
            <p className="mb-2">If you're seeing broken characters or corrupted text:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Ensure your device supports Chinese character display</li>
              <li>Try downloading the translation pack again, as the file might be corrupted</li>
              <li>Check if your Minecraft installation is up to date</li>
              <li>Try clearing Minecraft's cache and restarting the game</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="minecraft-card p-6 mb-8">
        <h2 className="text-xl font-pixel mb-4">Technical Requirements</h2>

        <div className="space-y-4">
          <p>To use PixelLingual translation packs, your device must meet the following requirements:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Minecraft Bedrock Edition (latest version recommended)</li>
            <li>Device with support for Chinese character display</li>
            <li>At least 100MB of free storage space</li>
            <li>Internet connection for downloading translation packs</li>
          </ul>
        </div>
      </div>

      <div className="minecraft-card p-6">
        <h2 className="text-xl font-pixel mb-4">Contact Support</h2>

        <p className="mb-4">
          If you're still experiencing issues after trying the troubleshooting steps above, please contact our support
          team:
        </p>

        <div className="space-y-2">
          <p>Email: support@pixellingual.com</p>
          <p>
            Discord: Join our{" "}
            <a href="#" className="text-primary hover:underline">
              Discord server
            </a>{" "}
            for community support
          </p>
        </div>

        <div className="mt-6">
          <Button asChild className="minecraft-btn">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

