# Touching Meaning — Literature review, đợt 1

Ngày cập nhật: 27 September 2026. Đã đọc toàn bộ phần văn bản của sáu tài liệu người dùng cung cấp và kiểm tra hình/bố cục liên quan. Đây là focused review của bộ tài liệu này, chưa phải systematic literature review hay bằng chứng bao quát để khẳng định novelty.

## 1. Vai trò của từng nguồn

| Nguồn | Loại tài liệu | Dùng cho Touching Meaning | Giới hạn khi sử dụng |
|---|---|---|---|
| Living Jiagu, Cheng et al., 2020 | CHI EA, Interactivity; 4 trang | Đối chiếu gần nhất về written characters và animated wall scenes | Không có đánh giá đo learning gain trong bài |
| Silk Road Journey, Li et al., 2024 | CHI Extended Abstracts; 5 trang | Cách trình bày artwork, cultural content, interaction và implementation | Không mô tả đủ study để xác nhận tăng cultural awareness |
| Fontana, van Renswouw et al., 2022 | CHI Extended Abstracts; 7 trang bài, cộng 1 trang bìa repository | Iterative design, onboarding, observation/interview, inclusivity | Preliminary tests; không chứng minh lợi ích xã hội dài hạn |
| Looking Glass, Müller et al., 2012 | CHI full paper; 10 trang | Cơ sở thực nghiệm rõ nhất cho RQ2: noticing interactivity | Camera/movement interaction khác direct touch |
| HydraScope, Wu, 2012 | Berkeley technical report / master's thesis | Wall interaction, tách input/display, reuse architecture | Không phải CHI paper; task hiệu suất khác trải nghiệm nghệ thuật |
| Designing for Tomorrow's Digital Outcasts, Smith, 2013 | Chương sách; tr. 215–233 | Accessibility, yêu cầu vận động/cảm giác và feedback | Tổng hợp/quan điểm thiết kế; không phải một controlled study |

**Cách đọc citations dưới đây:** PDF page là số trang trong file được gửi. Fontana có một trang bìa repository trước bài. HydraScope có hai trang front matter trước phần nội dung được đánh số 1. Chương sách bắt đầu ở printed page 215.

## 2. Living Jiagu

**Reference:** Yong Cheng, Sijia Ma, Jun Chen, Wenhui Guo, Yingying Zhao, Yaolin Chen, Jingtao Wang, Yushi Jing, and Wenli Zhu. 2020. *Living Jiagu: Enabling Constructive Etymology for Chinese Learning*. CHI EA '20, 1–4. [DOI](https://doi.org/10.1145/3334480.3383167).

### Bài thực sự làm gì

Participants nhìn image prompt, vẽ một pictographic Oracle Bone Script character trên tablet, rồi hệ thống đánh giá sketch và đưa phiên bản animated vào wall scene. Setup gồm digital canvas, 2–5 tablets và backend dùng TensorFlow. Các nhân vật do nhiều người tạo có thể cùng xuất hiện và tương tác trong scene. Nguồn: PDF pp. 2–3, “The Design of Living Jiagu”.

Hai phần kỹ thuật chính là neural similarity matching và sketch animation dựa trên stroke correspondence/tween generation. Bài mô tả kiến trúc và quy trình; không đưa benchmark đầy đủ để mình dùng làm kết luận về độ chính xác của thuật toán. Nguồn: PDF pp. 3–4.

### Bằng chứng và giới hạn

Tác giả báo cáo hơn 1.000 attendees trải nghiệm installation ở Google Developer Days Shanghai tháng 9/2019 và phản hồi tích cực. Đây là thông tin deployment do tác giả báo cáo. Bài không trình bày pre/post test, retention test, nhóm đối chứng, hay learning outcome được đo. Không chuyển “1.000 attendees” thành “N=1.000 trong study chứng minh hiệu quả học”. Nguồn: PDF p. 4, Conclusions.

### Adapt cho dự án

- Dùng để chứng minh có tiền lệ kết nối written characters, người tham gia và animated wall environments.
- Nêu khác biệt cụ thể: construction from image prompts trên tablet so với activation of existing Kanji bằng direct wall touch.
- Giữ mục tiêu riêng: trải nghiệm nghệ thuật và semantic interpretation.
- Không dùng lập luận “Living Jiagu chỉ dạy học, không có nghệ thuật”: bài cũng có artistic rendering và shared scenes.
- Không đồng nhất modern Kanji với Oracle Bone Script hoặc giả định mọi Kanji là pictograph. Các biến đổi là diễn giải nghệ thuật của meaning được chọn, không tự động là lịch sử hình thành chữ.

**Citation-ready sentence:** “Living Jiagu connects participant-drawn Oracle Bone Script characters with animated wall scenes through a learning activity organized around constructive etymology [1]. Our installation begins with existing Kanji and examines how an authored visual transformation is interpreted after direct touch.”

## 3. Silk Road Journey

**Reference:** Jingke Li, Guoyu Sun, Congyun Tang, Wenjuan Chen, Wenwen Yang, Wenxuan Kou, Zhonghe Ruan, Wanqing Ma, and Xuran Nie. 2024. *Silk Road Journey: A Real-time AI-based Interactive Art Installation for Silk Road Cultural Reenactment and Experience*. CHI EA '24, 1–5. [DOI](https://doi.org/10.1145/3613905.3648655).

### Bài thực sự làm gì

Sáu địa điểm được tổ chức thành stories và artistic styles. Visitors chọn địa điểm qua physical map/buttons, tương tác bằng body gestures, chụp pose và nhận stylized image; cuối trải nghiệm có QR download. Setup kết hợp màn hình/projector, camera, physical model, buttons và speakers. Nguồn: PDF pp. 2–3, §§3.1–3.3.

Implementation dùng Unity và ComfyUI, với pose/condition control và diffusion image generation. Tác giả báo cáo generation khoảng 6–8 giây ở một cấu hình, rồi khoảng 3 giây khi thêm LCM. Đây là reported performance cho workflow/hardware của họ; không phải latency dự kiến cho wall của mình. Nguồn: PDF pp. 3–4, §4.

### Bằng chứng và giới hạn

Conclusion nói preliminary exhibition research gợi sự tò mò, nhưng không cung cấp sample size, recruitment, instruments hay analysis đủ chi tiết để đánh giá một kết luận đo lường về cultural awareness/identity. Trích bài cho design/implementation, giữ các lợi ích văn hóa dưới dạng mục tiêu hoặc nhận định tác giả. Nguồn: PDF p. 5.

### Adapt cho dự án

- Học cách kết nối nội dung văn hóa → visitor journey → installation setup → technical realization.
- Cho thấy spatial experience và interaction sequence bằng hình; một screenshot đẹp không đủ giải thích cách người dùng tương tác.
- Dự án của mình không cần thêm real-time AI chỉ để giống bài. AI-assisted asset preparation và live model inference là hai vai trò khác nhau.
- Không mượn countdown, camera hay photo output khi chúng không phù hợp với nghệ thuật contemplative của nhóm.

**Citation-ready sentence:** “Silk Road Journey combines culturally themed narratives, bodily interaction, and pose-conditioned imagery within an interactive installation [2]. Touching Meaning similarly links visitor action with visual content, while concentrating on the interpretation of a selected written character.”

## 4. Fontana

**Reference:** Loes van Renswouw, Yvonne van Hamersveld, Hugo Huibers, Steven Vos, and Carine Lallemand. 2022. *Fontana: Triggering Physical Activity and Social Connectedness through an Interactive Water Installation*. CHI '22 Extended Abstracts, Article 462, 1–7. [DOI](https://doi.org/10.1145/3491101.3519765).

### Thiết kế và phương pháp

Water installation dùng pressure-sensitive floor tiles để điều khiển fountain. Quá trình gồm sketching, feedback requests trong năm Facebook groups, review bởi 10 design experts, rồi preliminary tests. Không gộp số groups, experts và test participants thành một sample. Nguồn: PDF p. 4, §3.

Test đầu dùng Wizard of Oz, N=12: chỉ một người tự đến tương tác; năm người hỏi trước; sáu người được mời. Test sau dùng prototype cải tiến, N=19 adults, gồm năm older adults; dữ liệu là observations và interviews. Nguồn: PDF p. 5, §4.1.

### Bằng chứng và giới hạn

Tác giả ghi nhận onboarding rõ hơn và các phiên tương tác khoảng 10 phút ở lần sau, so với không quá năm phút ở lần đầu. Nhiều yếu tố prototype/deployment thay đổi, nên không diễn giải đây là causal effect của một chi tiết duy nhất. Cụm “groups (n=9)” trong bài có đơn vị đếm chưa thật rõ; tránh sao chép như chín nhóm độc lập nếu chưa xác minh. Bài cũng tự nêu rằng ảnh hưởng xã hội dài hạn cần triển khai và quan sát dài hơn. Nguồn: PDF pp. 5–7.

### Adapt cho dự án

- Đây là mẫu tổ chức design process phù hợp: design intention → prototype → observed difficulty → revision → remaining questions.
- Theo dõi first touch, help request, missed touch, repeat activation và cách người dùng tìm hiểu effect.
- Đừng biến feedback của hai PIs thành user-study results; đó là internal design review.
- Học cách phân biệt concept render, tested prototype và future scenario trong figure captions.
- Single-touch vẫn có thể có spectators hoặc người chờ lượt. Tuy nhiên social connectedness chưa phải outcome của dự án mình.

**Citation-ready sentence:** “Fontana documents how observations of unclear onboarding informed revisions to an interactive water installation [3]. This motivates examining whether visitors recognize Kanji as touch targets before asking how they interpret the resulting visual environment.”

## 5. Looking Glass

**Reference:** Jörg Müller, Robert Walter, Gilles Bailly, Michael Nischt, and Florian Alt. 2012. *Looking Glass: A Field Study on Noticing Interactivity of a Shop Window*. CHI '12, 297–306. [DOI](https://doi.org/10.1145/2207676.2207718). Bibliographic metadata cross-checked with [coauthor publication record](https://www.florian-alt.org/academic/publications/).

### Ba giai đoạn nghiên cứu

1. Pre-study tại cafeteria: quan sát 832 passers-by. Nguồn: PDF p. 4.
2. Lab study: N=16, within-subjects, so sánh mirror, silhouette, avatar và abstract representation trong interactive/noninteractive conditions. Nguồn: PDF pp. 4–5.
3. Field deployment: ba shop-window displays trong ba tuần; 11 ngày liên tiếp được chọn để manual coding, cho 502 interaction sessions. “502” là sessions, không phải số người duy nhất hay toàn bộ passers-by. Nguồn: PDF pp. 5–7.

### Kết quả liên quan

Lab study cho thấy mirror và silhouette giúp nhận biết interactivity nhanh hơn avatar và abstract representation trong điều kiện đã mô tả. Các thời gian 1,2 và 1,6 giây không phải universal thresholds cho mọi public display. Trong field study, phản hồi với chuyển động của người đi ngang, đặc biệt mirror image, tạo nhiều interaction hơn attract-loop/call-to-action comparison của họ. Nguồn: PDF pp. 5–7.

Bài mô tả landing effect: người dùng đi quá màn hình rồi quay lại; và cách spectators nhìn cả người đang tương tác lẫn màn hình, đôi khi tạo nhiều hàng. Honeypot effect là khái niệm có từ prior work, không nên gán toàn bộ nguồn gốc khái niệm cho bài này. Nguồn: PDF pp. 2, 7–9.

### Adapt cho dự án

- Phân biệt noticing the display, recognizing interactivity, trying a touch, successful activation và semantic interpretation.
- Một màn hình đang chuyển động có thể thu hút mắt mà vẫn trông như video không tương tác.
- Tạo feedback ngay khi touch được nhận, dù environmental transition tiếp tục chậm; kiểm tra người dùng có hiểu chính họ gây ra effect không.
- Không tự động thêm camera/silhouette: kết quả của bài không phải bằng chứng rằng camera là lựa chọn tốt nhất cho artwork này.
- Không áp dụng khả năng đứng nhiều hàng để tương tác từ xa sang direct touch; ở wall của mình, spectators có thể xem nhưng cần tiếp cận để kích hoạt.
- Recruited sessions không đo được natural passer-by attraction rate. RQ2 hiện nên nói rõ “during a recruited initial encounter”. Muốn nghiên cứu tự nhiên phải có phương án deployment riêng.
- Incidental interaction trong bài này không đồng nghĩa incidental learning: đó là hai khái niệm khác nhau.

**Citation-ready sentence:** “Müller et al. distinguish noticing a public display from recognizing its interactivity and examine how responsive visual cues and other users' behavior shape this transition [4]. We use this distinction to separate discovery of touch interaction from interpretation of the transformation.”

## 6. HydraScope

**Reference:** Hong Wu. 2012. *HydraScope: Interaction and Application of Wall Sized Display*. UCB/EECS-2012-149, University of California, Berkeley. [Official record](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2012/EECS-2012-149.html). Repository BibTeX labels it a master's thesis; cover labels it a technical report. Björn Hartmann is advisor/editor, not a listed coauthor of the article text.

### Phạm vi

Hệ thống sáu monitors, 5760 × 2160, nghiên cứu remote control và tái sử dụng applications trên display wall. So sánh bốn input techniques: four-way, omni-directional, phone touchpad và phone + Kinect. Selection/dragging evaluation có 10 participants. Search application evaluation cũng báo cáo 10 users thành năm pairs; không đủ thông tin để giả định đó là 20 người khác nhau. Nguồn: PDF pp. 9–17, 20.

### Đọc kết quả cẩn thận

Phần abstract/conclusion nói touchpad tốt nhất cả speed và accuracy. Nhưng detailed results cho biết touchpad nhanh nhất về overall completion, trong khi four-way có ít incorrect placements nhất. Đối với larger targets, omni-directional selection còn nhanh hơn touchpad. Vì vậy không viết “touchpad is universally the most accurate”. Nguồn: PDF pp. 15–16, Figures 8–10; đối chiếu p. 22.

Search tasks khác nhau giữa các conditions; reporting không đủ để coi claimed efficiency advantage là kết luận causal chắc chắn. Nguồn: PDF pp. 20–21.

### Adapt cho dự án

- Dùng làm supporting technical context cho việc input và large visual surface tạo các trade-offs riêng.
- Tenzer Wall được vận hành như một large monitor: không cần sao chép distributed synchronization architecture của HydraScope.
- Không lấy remote-control performance làm bằng chứng cho direct-touch target size hoặc accessibility.
- Data-driven character configuration là engineering strategy của nhóm; chưa nên gọi là research contribution mới dựa trên việc nó “reusable”.

**Citation-ready sentence:** “Wu's HydraScope report examines remote input and application reuse for wall displays [5]. Its task-oriented setting differs from ours, but provides context for treating input demands and display scale as distinct design considerations.”

## 7. Designing for Tomorrow's Digital Outcasts

**Reference:** Kel Smith. 2013. “Designing for Tomorrow's Digital Outcasts.” In *Digital Outcasts: Moving Technology Forward without Leaving People Behind*, Chapter 9, 215–233. Morgan Kaufmann. DOI: 10.1016/B978-0-12-404705-1.00009-1. Author/year/book title cross-checked with the [publisher record](https://shop.elsevier.com/books/digital-outcasts/smith/978-0-12-404705-1).

### Nguồn này đóng góp gì

Chương bàn về embodied/sensory interaction, gesture, touch, assistive interfaces và những người có thể bị bỏ lại khi công nghệ thay đổi. Phần trực tiếp hữu ích nhất là printed pp. 218–220: phản hồi, learnability, detection accuracy, comfort, contextual familiarity và display effects. Printed pp. 220–222 đưa ví dụ pressure-sensitive carpet và các input modalities khác nhau.

Đây là một chương tổng hợp có tính hướng dẫn và dự báo từ 2013. Không trình bày một study riêng kiểm nghiệm Kanji, public-wall meaning interpretation, hay hiệu quả học. Những ví dụ dự án được kể lại là secondary accounts; nếu dùng *Mediated Body* làm precedent chính, cần đọc nghiên cứu gốc.

### Adapt cho dự án

- Không coi single tap là tự động inclusive: tầm với, moving targets, fatigue và sensory feedback đều tạo yêu cầu.
- Kiểm tra interaction ở độ cao phù hợp với nhiều tư thế; không yêu cầu thao tác nhanh/chính xác để thưởng thức artwork.
- Event-based sound là lựa chọn bổ sung; không nên trở thành kênh duy nhất báo thành công.
- Visual intensity và quyền dừng trải nghiệm cần được thiết kế có chủ ý.
- Sử dụng “accessibility goals/considerations” trước khi có đánh giá với người có nhu cầu đa dạng; không khẳng định “fully accessible”.

Không dùng các medical/neuroscience examples làm bằng chứng về lợi ích sức khỏe của installation. Không sao chép những nhận định công nghệ từ 2013 như thể chúng mô tả hiện trạng 2026. Cũng không dùng định nghĩa ngắn của chương như nền tảng lý thuyết đầy đủ cho embodied interaction.

**Citation-ready sentence:** “Smith discusses how physical input can create new demands on movement, perception, and comfort [6]. This motivates treating reachability and feedback as design concerns rather than assuming that direct touch is accessible to every visitor.”

## 8. Synthesis: research opportunity hiện tại

**Đoạn tiếng Anh để dùng khi trao đổi với PIs:**

> Prior work connects written characters with animated scenes, embeds cultural narratives in interactive environments, and examines how people discover public interaction. Together, these studies motivate a focused question for Touching Meaning: how do visitors interpret the relationship between an existing Kanji character, their touch, and the visual environment that follows? The proposed contribution lies in documenting this design and investigating those interpretations. The reviewed sources do not establish that this exact question is new across HCI; further work is needed to position it against interactive typography, digital calligraphy, and research on ambiguity and interpretation in art.

### Ba phân biệt nên giữ trong paper

1. **Intention / implementation / evidence:** muốn scene contemplative khác với đã triển khai đủ, và khác với participants thực sự cảm thấy contemplative.
2. **Causality / meaning:** hiểu “touch của tôi gây ra effect” khác với hiểu “character có nghĩa gì”.
3. **Immediate association / retention:** nhận ra meaning ngay sau trải nghiệm khác với nhớ sau một khoảng thời gian.

### RQ wording đề xuất sau review

- RQ1, primary: How do participants interpret relationships between Kanji and their visual transformations in a large-scale interactive artwork?
- RQ2, secondary: How do participants discover and engage with direct-touch interactions during a recruited initial encounter with the installation?
- RQ3, exploratory: What previously unfamiliar Kanji meanings can participants identify immediately after interacting with the installation?

Đây là đề xuất chỉnh wording, chưa thay cho quyết định của PIs. Với pre-test, cần thừa nhận participants đã được gợi chú ý tới meaning; không gọi đó là unprimed incidental learning.

## 9. Adapt cách viết, không sao chép câu chữ

| Điểm học từ nguồn | Áp dụng trong draft |
|---|---|
| Living Jiagu: giới thiệu concept rồi giải thích thao tác cụ thể | Abstract và Introduction đưa reader đến Kanji → touch → environment sớm |
| Silk Road Journey: nối artistic content và implementation | Tách Interaction, Design priorities và planned architecture |
| Fontana: chỉ ra iteration nào được test, cái nào là future | Phân biệt Prototype 1, internal feedback, planned refinements và proposed study |
| Looking Glass: mỗi claim gắn với design/method/evidence | Tách interpretation, discovery và recognition; không mượn effect sizes |
| HydraScope: architecture rõ ràng | Mô tả các layers ngắn gọn, không thêm technical novelty không có |
| Digital Outcasts: xem input theo khả năng người dùng | Viết reachability/feedback như requirements cần kiểm tra |

Ưu tiên các động từ theo trạng thái: “we present/describe” cho artifact có thật; “we aim/propose/plan” cho intention; “we observed/found” chỉ sau khi có dữ liệu. Dùng “participants” khi có study, “visitors” khi mô tả artwork, và “project team” khi nói internal feedback. Tránh lời khẳng định hiệu quả lớn trong các bài mẫu nếu evidence của chính bài không hỗ trợ.

## 10. Citation và việc còn thiếu

- Draft dùng [1]–[6] tương ứng thứ tự nguồn trong tài liệu này, với references đầy đủ; file BibTeX có thể import vào Zotero/Overleaf.
- Chưa đọc các tài liệu chỉ xuất hiện trong bibliography của sáu nguồn; không trích chúng như thể đã đọc trực tiếp.
- Nên bổ sung nghiên cứu gốc về interactive typography/calligraphy, interpretation/ambiguity in art, research-through-design methodology, và phương pháp qualitative analysis phù hợp trước khi hoàn tất framing.
- Nếu giữ RQ3, cần nguồn trực tiếp về incidental recognition và testing effects; sáu nguồn hiện tại chưa đủ.
- Thêm ảnh thật của prototype và sequence của một transformation trước bản gửi. Không tái sử dụng figure của các bài mẫu trong draft này.
- Bản nghiên cứu hiện dựa trên meeting notes người dùng cung cấp; chưa phải audit xác nhận toàn bộ implementation trong repository.
