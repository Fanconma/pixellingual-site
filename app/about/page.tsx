import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Globe, Download, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="About PixelLingual"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-pixel tracking-tight">
              About <span className="text-primary">PixelLingual</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We're passionate about making Minecraft accessible to Chinese-speaking players through high-quality
              translations of Bedrock Edition content.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-pixel mb-6">Our Story</h2>
              <div className="space-y-4">
                <p>
                  PixelLingual began in 2020 when a group of bilingual Minecraft enthusiasts noticed that many amazing
                  Bedrock Edition maps, mods, and content were only available in English, creating a barrier for
                  Chinese-speaking players.
                </p>
                <p>
                  What started as a small passion project quickly grew into a dedicated community effort. Our team of
                  translators, developers, and Minecraft experts work together to ensure that language is never a
                  barrier to enjoying the full Minecraft experience.
                </p>
                <p>
                  Today, PixelLingual is proud to offer hundreds of high-quality translations, all completely free for
                  the community. Our mission is to bridge cultures through gaming and make Minecraft truly accessible to
                  everyone.
                </p>
              </div>
            </div>
            <div className="minecraft-card overflow-hidden">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Our Team"
                alt="PixelLingual Team"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">Our Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-pixel text-xl">Accessibility</h3>
              <p className="text-muted-foreground">
                We believe everyone should be able to enjoy Minecraft regardless of the language they speak.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-pixel text-xl">Quality</h3>
              <p className="text-muted-foreground">
                We're committed to providing accurate, natural-sounding translations that preserve the original
                experience.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-pixel text-xl">Community</h3>
              <p className="text-muted-foreground">
                We're built by and for the Minecraft community, with open collaboration at our core.
              </p>
            </div>

            <div className="minecraft-card p-6 space-y-4">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <Download className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-pixel text-xl">Free Access</h3>
              <p className="text-muted-foreground">
                All our translations are and will always be free for everyone to download and enjoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">Our Translation Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  1
                </div>
                <h3 className="font-pixel text-xl">Selection</h3>
                <p className="text-muted-foreground">
                  We carefully select popular and high-quality Minecraft content that would benefit from Chinese
                  translation.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl text-muted-foreground">
                →
              </div>
            </div>

            <div className="relative">
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  2
                </div>
                <h3 className="font-pixel text-xl">Translation</h3>
                <p className="text-muted-foreground">
                  Our team of bilingual translators works to create accurate and natural-sounding Chinese translations.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-4xl text-muted-foreground">
                →
              </div>
            </div>

            <div>
              <div className="minecraft-card p-6 space-y-4">
                <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center font-pixel text-xl text-white">
                  3
                </div>
                <h3 className="font-pixel text-xl">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Each translation undergoes rigorous testing and review before being released to ensure quality and
                  accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-pixel mb-12 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Li Wei",
                role: "Founder & Lead Translator",
                image: "/placeholder.svg?height=400&width=400&text=Li Wei",
              },
              {
                name: "Zhang Min",
                role: "Senior Translator",
                image: "/placeholder.svg?height=400&width=400&text=Zhang Min",
              },
              {
                name: "Wang Chen",
                role: "Technical Director",
                image: "/placeholder.svg?height=400&width=400&text=Wang Chen",
              },
              {
                name: "Liu Jia",
                role: "Community Manager",
                image: "/placeholder.svg?height=400&width=400&text=Liu Jia",
              },
            ].map((member, i) => (
              <div key={i} className="minecraft-card overflow-hidden">
                <div className="relative h-64">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-pixel text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-pixel">Join Our Community</h2>
            <p className="text-muted-foreground">
              Whether you're a player looking for translations or a translator wanting to contribute, we welcome you to
              join our growing community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="minecraft-btn">
                <Link href="/market">
                  Browse Translations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

