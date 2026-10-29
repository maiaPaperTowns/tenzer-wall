# Touching Meaning: Exploring Semantic Interaction with Kanji on a Large-Scale Interactive Display

**Working draft — September 27, 2026.** English reading copy of the LaTeX manuscript. Study procedures and future features remain provisional; no participant results are reported. The LaTeX source is the format-controlled version.

## Abstract
Written characters can serve as both visual forms and meaningful objects of interaction. We present Touching Meaning, a browser-based interactive artwork in which touching a Kanji character activates a visual environment associated with its meaning. Flowers bloom, birds move across the display, and thunderstorms unfold at wall scale. The installation foregrounds artistic exploration, while opening questions about how people discover touch interaction and interpret relationships between written forms and animated environments. We describe an initial prototype, design priorities developed through interdisciplinary review, and a proposed formative study of semantic interpretation, interaction discovery, and immediate recognition of previously unfamiliar meanings. Our current contribution is a design proposition and prototype; the study has not yet produced participant findings. The work invites discussion about making meaning perceptible through interaction while preserving room for interpretation in a public artwork.


**Keywords:** interactive art, Kanji, semantic transformation, public displays, touch interaction



## Introduction

How might the meaning of a written character become something a visitor can explore through touch? In Touching Meaning, Kanji characters act as entry points into animated environments. Touching 花 (flower), for example, activates flowers and petals that extend across a large display. The design ambition is to make the character's response and the emerging scene feel connected, allowing visitors to consider a relationship between written form, action, and meaning.

Existing installations connect character construction with animated scenes [1], place visitors within culturally themed imagery [2], and support exploration through environmental feedback [3]. Research on public displays also shows that recognizing an opportunity to interact is itself a design problem [4]. These strands motivate our investigation of semantic interpretation within an artistic encounter. We use *semantic transformation* as a working term for an interaction in which activating a written symbol produces a visual change derived from an intended meaning. We do not claim this term or the broader design space is new.

The prototype has been demonstrated on its intended wall and discussed within the interdisciplinary project team. This paper presents its interaction concept, design rationale, and a proposed evaluation. The research focuses on how visitors interpret transformations; discovering interaction is a related concern, and immediate meaning recognition is exploratory. Language instruction is not the installation's primary purpose.


## Related Work


### Characters and Cultural Experience in Interactive Art

Living Jiagu [1] invites participants to draw pictographic Oracle Bone Script characters on tablets from image prompts. Recognized sketches are animated and incorporated into a shared wall scene. The authors frame this process as constructive etymology for Chinese learning. Their report describes deployment and positive reception, without presenting a measured learning evaluation. Touching Meaning instead begins with existing Kanji and direct wall touch. Its question concerns the interpretation of an authored transformation rather than the construction of a recognizable sketch.

Silk Road Journey [2] combines location-based stories, bodily interaction, and pose-conditioned image generation to create a cultural experience. Its account connects narrative, installation layout, and technical implementation. We similarly connect visual content to the visitor's action, but focus on the meaning of the selected character. AI-assisted asset preparation, where used, is part of production; live generative AI is not required by our interaction concept. Neither work establishes how visitors interpret the particular character-to-environment relationships proposed here.


### Discovery and Interaction at Environmental Scale

Fontana [3] documents iterative development of a water installation, including preliminary tests with 12 and 19 participants. Initial uncertainty about interaction points informed a revised prototype. The work suggests treating onboarding and accessibility as observable design concerns. Looking Glass [4] more directly examines noticing interactivity through laboratory and field studies of movement-responsive public displays. Its findings distinguish recognition of interactivity from merely attending to a display and describe the role of other people's visible interaction. These concerns inform our observation plan; their specific benefits for mirrored images cannot be assumed for a touch-only artwork.

Wu's HydraScope technical report [5] examines remote input techniques and application reuse for display walls. Its pointing and dragging tasks differ from our direct-touch artistic experience. It provides context for considering input separately from the visual surface. Smith's accessibility discussion [6] further cautions that physical input can impose demands on movement, perception, and comfort. These sources motivate attention to reach and feedback, without establishing that direct touch is accessible to everyone. Together, the reviewed works locate our proposed study at the intersection of symbolic content, environmental visual feedback, and interaction discovery. Establishing a broader novelty claim requires further literature review.


## The Design of Touching Meaning


### Interaction and Current Prototype

The prototype runs in a browser on a wall with an approximate resolution of 7680 × 2160 pixels and infrared touch sensing. Characters appear near the upper part of the display and move downward at varied horizontal positions. A single touch activates the associated effect; successive scenes fade as new interactions occur. The initial character set includes flower, sun, bird, mountain, thunder, rain, and rainbow. Simultaneous multi-touch is outside the current scope.


**Figure 1. Conceptual interaction sequence**

Written character → direct touch → semantic transformation → wall environment.

花 (flower): bloom and petals; 鳥 (bird): emergence and flight; 雷 (thunder): storm and illumination. This describes design intent, not participant findings.


Internal review supported full-wall visual effects and a mixture of natural imagery and artistic influences. It also identified priorities for subsequent iterations: improving calligraphic forms, keeping targets reachable, and separating character configuration from rendering logic. This feedback is part of the design process, not a participant evaluation.


### Design Priorities and Planned Refinements

**Connect form and effect.** We aim for the character itself to participate in the transition, through changes to strokes, position, or appearance. This remains a refinement goal rather than a claim that every current effect achieves visual continuity. Proposed strategies include object emergence, environmental change, and landscape transformation. These are design lenses, not validated categories.

**Support unhurried exploration.** Gradual transitions and opportunities to revisit characters are intended to support a contemplative experience. Scores, timed challenges, and precision-dependent success are excluded from the intended interaction. Event-based environmental sound is under consideration; its contribution has not been evaluated.

**Separate visible and reachable space.** Visual effects can extend into upper display areas that visitors cannot touch. Interaction targets must pass through reachable areas and allow for imperfect infrared input. We will refine their size, spacing, and motion through wall testing. A reported long-touch context-menu interruption is also an implementation issue to resolve and verify.

**Keep content editable and attributable.** The planned architecture separates touch handling, character-to-effect mappings, and animation. Approximately 20 characters are under consideration, subject to linguistic review. Original calligraphy is a possibility. Asset records will document sources, permissions, and any AI-assisted transformations. These production decisions support iteration; they are not presented as novel algorithms.


## Proposed Formative Study

The study design remains subject to faculty review and the applicable institutional process. This draft reports no participant data or confirmed ethics determination. We propose recruiting approximately 12–20 adults, recording familiarity with Japanese and other languages using Chinese characters, and documenting prior exposure to the installation.

Our primary question is: *How do participants interpret the relationship between Kanji and their visual transformations?* A secondary question asks how participants discover and engage with direct touch during an initial encounter. An exploratory question asks what previously unfamiliar meanings participants can identify immediately afterward. These questions address interpretation, behavior, and immediate recognition separately.

The proposed procedure includes consent and background questions, a brief free-response meaning pre-test, approximately 15 minutes of exploration, an immediate post-test, and a semi-structured interview. Post-testing precedes discussion of meanings to reduce interview cueing. Initial instructions invite exploration without specifying which objects to touch. A consistent assistance rule will be agreed before collection; all assistance will be recorded. Sessions will also record first actions, unsuccessful touches, repeated activations, movement, and attempts to touch generated imagery.

Interviews will ask participants what they thought selected characters represented and which aspects of the transformation informed that interpretation. We plan qualitative coding of explanations, including ambiguous and contradictory cases, alongside descriptive summaries of interaction behavior. Logs will distinguish displayed characters from successful activations. Activation is a practical exposure indicator, but cannot establish attention by itself. Recognition summaries will therefore report explicit inclusion rules, participant-level denominators, missing responses, and acceptable meaning variants reviewed for linguistic appropriateness.

Two limitations are built into this proposal. First, recruited participants already expect an experience, and the pre-test may direct attention toward meaning. Their behavior cannot establish spontaneous discoverability among passers-by. Second, immediate pre/post changes cannot demonstrate durable retention or a causal learning benefit. A later public deployment or delayed recognition assessment would require a separately specified design.


## Discussion and Next Steps

The design raises a tension between conveying an intended meaning and allowing an open artistic interpretation. A moving bird may invite a relatively specific association, while wind expressed through moving foliage may support several explanations. These are possibilities to investigate, not predicted findings. Likewise, noticing that a touch caused an effect and identifying what a character means are distinct achievements; the proposed study should preserve that distinction.

The current contribution is an implemented interaction concept and an account of its emerging design priorities. Empirical findings and resulting design implications remain future work. Further development will refine character-to-scene transitions, document wall behavior, and complete the study protocol. We seek discussion about how much semantic ambiguity is productive in an artwork, how touch can be discoverable without dominating its visual character, and what evidence is appropriate for claims about interpretation in a brief encounter.

## References


1. Yong Cheng, Sijia Ma, Jun Chen, Wenhui Guo, Yingying Zhao, Yaolin Chen, Jingtao Wang, Yushi Jing, and Wenli Zhu. 2020. Living Jiagu: Enabling Constructive Etymology for Chinese Learning. In *Extended Abstracts of the 2020 CHI Conference on Human Factors in Computing Systems* (CHI EA '20). ACM, New York, NY, USA, 1–4. [Source](https://doi.org/10.1145/3334480.3383167)


2. Jingke Li, Guoyu Sun, Congyun Tang, Wenjuan Chen, Wenwen Yang, Wenxuan Kou, Zhonghe Ruan, Wanqing Ma, and Xuran Nie. 2024. Silk Road Journey: A Real-time AI-based Interactive Art Installation for Silk Road Cultural Reenactment and Experience. In *Extended Abstracts of the CHI Conference on Human Factors in Computing Systems* (CHI EA '24). ACM, New York, NY, USA, 1–5. [Source](https://doi.org/10.1145/3613905.3648655)


3. Loes van Renswouw, Yvonne van Hamersveld, Hugo Huibers, Steven Vos, and Carine Lallemand. 2022. Fontana: Triggering Physical Activity and Social Connectedness through an Interactive Water Installation. In *CHI Conference on Human Factors in Computing Systems Extended Abstracts* (CHI '22 Extended Abstracts). ACM, New York, NY, USA, Article 462, 1–7. [Source](https://doi.org/10.1145/3491101.3519765)


4. Jörg Müller, Robert Walter, Gilles Bailly, Michael Nischt, and Florian Alt. 2012. Looking Glass: A Field Study on Noticing Interactivity of a Shop Window. In *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems* (CHI '12). ACM, New York, NY, USA, 297–306. [Source](https://doi.org/10.1145/2207676.2207718)


5. Hong Wu. 2012. *HydraScope: Interaction and Application of Wall Sized Display*. Technical Report UCB/EECS-2012-149. University of California, Berkeley. [Source](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2012/EECS-2012-149.html)


6. Kel Smith. 2013. Designing for Tomorrow's Digital Outcasts. In *Digital Outcasts: Moving Technology Forward without Leaving People Behind*. Morgan Kaufmann, Chapter 9, 215–233. [Source](https://doi.org/10.1016/B978-0-12-404705-1.00009-1) 
