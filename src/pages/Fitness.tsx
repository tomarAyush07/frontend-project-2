import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Fitness: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold">{t('fitness.title')}</h1>
          <p className="mt-3 text-sky-100 max-w-2xl">{t('fitness.subtitle')}</p>
          <div className="mt-6 flex items-center gap-3">
            <Badge className="bg-emerald-500">{t('fitness.badges.safety')}</Badge>
            <Badge className="bg-amber-500">{t('fitness.badges.cmrs')}</Badge>
            <Badge className="bg-blue-500">{t('fitness.badges.readiness')}</Badge>
          </div>
        </div>
      </div>

      {/* What is Fitness Certification */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('fitness.whatIs.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>{t('fitness.whatIs.body')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('fitness.download.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">{t('fitness.download.certReport')}</Button>
            <Button className="w-full" variant="secondary">{t('fitness.download.safetyAudit')}</Button>
            <p className="text-xs text-muted-foreground">{t('fitness.download.note')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Certification Timeline */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">{t('fitness.timeline.title')}</h2>
        <p className="text-sm text-muted-foreground">{t('fitness.timeline.inline')}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: t('fitness.timeline.steps.track'), color: "bg-slate-100", badge: t('fitness.timeline.step', { n: 1 }) },
            { title: t('fitness.timeline.steps.trial'), color: "bg-blue-50", badge: t('fitness.timeline.step', { n: 2 }) },
            { title: t('fitness.timeline.steps.cmrs'), color: "bg-amber-50", badge: t('fitness.timeline.step', { n: 3 }) },
            { title: t('fitness.timeline.steps.cert'), color: "bg-emerald-50", badge: t('fitness.timeline.step', { n: 4 }) },
            { title: t('fitness.timeline.steps.ops'), color: "bg-violet-50", badge: t('fitness.timeline.step', { n: 5 }) },
          ].map((step, idx) => (
            <Card key={idx} className={`${step.color} border-dashed`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">{step.title}</CardTitle>
                  <Badge variant="outline">{step.badge}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{t('fitness.timeline.cardNote')}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Inspection Highlights */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">{t('fitness.highlights.title')}</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: t('fitness.highlights.items.safety.title'), desc: t('fitness.highlights.items.safety.desc') },
            { title: t('fitness.highlights.items.evac.title'), desc: t('fitness.highlights.items.evac.desc') },
            { title: t('fitness.highlights.items.rolling.title'), desc: t('fitness.highlights.items.rolling.desc') },
            { title: t('fitness.highlights.items.emergency.title'), desc: t('fitness.highlights.items.emergency.desc') },
          ].map((item, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Updates / Notices */}
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{t('fitness.updates.title')}</h2>
          <Badge className="bg-sky-600">{t('fitness.updates.live')}</Badge>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[t('fitness.updates.items.0'), t('fitness.updates.items.1'), t('fitness.updates.items.2')]
            .map((text, idx) => (
              <Card key={idx}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{t('fitness.updates.notice', { n: idx + 1 })}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{text}</p>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {/* Certifying Authority */}
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t('fitness.authority.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>{t('fitness.authority.body')}</p>
            <Separator />
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full border-4 border-emerald-500 grid place-items-center">
                <span className="text-xs font-semibold">{t('fitness.authority.stamp')}</span>
              </div>
              <div className="text-sm">
                <div className="font-medium text-foreground">{t('fitness.authority.org')}</div>
                <div className="text-muted-foreground">{t('fitness.authority.tagline')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t('fitness.contact.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>{t('fitness.contact.email')}</p>
            <p>{t('fitness.contact.helpline')}</p>
            <p>{t('fitness.contact.hours')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Fitness;
