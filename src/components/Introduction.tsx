import { AuraBeam, AuraBeamAnnotator, AuraBeamBody, AuraBeamTitle, AuraBeamVerticalDivider } from 'aura-beam-annotator'
import React from 'react'
import { introductionText } from './introductionText'
import Image from 'next/image'
import { Button } from './Button'
import Link from 'next/link'
import { AuraBeamColor } from 'aura-beam-annotator'

export const Introduction = () => {
    const colors: AuraBeamColor[] = ["lime", "green", "emerald", "teal", "cyan", "sky"]
    let positioning: "left" | "right" = "right"
    return (
        <div>
            <AuraBeam>
                {introductionText.map((section, index) => {
                    positioning = positioning === "left" ? "right" : "left"
                    return (
                        <>
                            <AuraBeamAnnotator key={section.title} positioning={positioning} color={colors[index]}>
                                <AuraBeamTitle title={section.title} positioning={positioning} />
                                <AuraBeamBody positioning={positioning}>
                                    {section.description}
                                </AuraBeamBody>
                                {section.subtitles.map((subtitle, index) => {
                                    return (
                                        <>
                                            <AuraBeamTitle title={subtitle.title} type='secondary' positioning={positioning} />
                                            <AuraBeamBody positioning={positioning}>
                                                <div className='flex flex-col lg:flex-row gap-4 items-center w-full'>
                                                    {subtitle.image &&
                                                        <Image src={subtitle.image} width={300} height={250} alt={subtitle.image} />}
                                                    {subtitle.description}
                                                </div>
                                            </AuraBeamBody>
                                        </>
                                    )
                                }
                                )}
                            </AuraBeamAnnotator>
                            {index < introductionText.length - 1 ?
                                <AuraBeamVerticalDivider
                                    color={colors[index + 1]}
                                    direction={positioning === "left" ? "l-to-r" : "r-to-l"} /> : null}
                        </>
                    )
                })}
            </AuraBeam>
            <Link
                href={'/algorithm'}
                className="text-2xl font-bold tracking-widest text-gray-100 flex items-center justify-center pb-16"
            >
                <Button > Start Now</Button>
            </Link>
        </div>
    )
}
