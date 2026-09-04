# Instruction GitHub cho teamwork COM1827 SOQPSK MODEM

Tài liệu này mô tả cấu trúc repo GitHub đề xuất để team làm việc từ xa, quản lý source VHDL gốc, RTL Verilog port lại, tài liệu đọc hiểu, log tiến độ, testbench, MATLAB scripts, Vivado/ModelSim simulation và báo cáo kiểm chứng.

Mục tiêu:

- Mọi người biết file nào đặt ở đâu.
- Dễ review Pull Request.
- Dễ theo dõi tiến độ từng ngày/từng module.
- Tách rõ **source gốc VHDL**, **source Verilog mới**, **simulation**, **MATLAB verification**, **docs**, **logs**.
- Tránh sửa nhầm source gốc khi chỉ đọc hiểu/port.

## 1. Cấu trúc repo đề xuất

```text
com1827-soqpsk-verilog/
  README.md
  .gitignore
  .gitattributes

  original_vhdl/
    README.md
    src/
    sim/
    matlab/
    constraints/

  rtl_verilog/
    README.md
    tx/
    rx/
    demod/
    common/
    top/
    stubs/

  tb/
    README.md
    block/
    integration/
    common/

  sim/
    README.md
    vivado/
    modelsim/
    scripts/
    results/
    waves/

  matlab/
    README.md
    golden/
    vectors/
    compare/
    plots/

  doc/
    README.md
    notes/
    design/
    weekly/
    reports/

  scripts/
    README.md
    python/
    tcl/
    powershell/

  project/
    vivado/
    modelsim/

  releases/
    README.md
```

## 2. Ý nghĩa từng thư mục

| Thư mục | Chức năng | Người dùng chính |
|---|---|---|
| `original_vhdl/` | Lưu bản VHDL gốc của project COM1827. Chỉ đọc, không sửa trừ khi có lý do đặc biệt. | Tất cả |
| `rtl_verilog/` | Lưu RTL Verilog/SystemVerilog được port lại từ VHDL. Đây là code chính team phát triển. | Khánh, Thịnh, Tiến, Thanh, Nguyệt |
| `tb/` | Lưu testbench SystemVerilog/Verilog cho từng module và integration. | Thanh, owner module |
| `sim/` | Lưu script chạy mô phỏng, kết quả mô phỏng, waveform, log. | Thanh, Thịnh, Khánh |
| `matlab/` | Lưu golden model, vector test, script compare và plot. | Thanh, Thịnh, Nguyệt |
| `doc/` | Lưu tài liệu đọc hiểu, timeline, log, báo cáo thiết kế/kiểm chứng. | Nguyệt, Khánh, owner module |
| `scripts/` | Script tiện ích: tạo vector, compare output, chạy batch sim, parse log. | Thanh, Thịnh |
| `project/` | File project Vivado/ModelSim nếu cần. Ưu tiên lưu script tạo project hơn là lưu toàn bộ project nặng. | Khánh, Thanh |
| `releases/` | Gói baseline nội bộ theo mốc: TX MVP, RX MVP, core MVP. | Khánh |

## 3. Quy định thư mục chi tiết

### `original_vhdl/`

```text
original_vhdl/
  README.md
  src/
    CPM_MOD/
    CPM_DEMOD/
    BER2/
    AWGN/
    common/
  sim/
  matlab/
  constraints/
```

Vai trò:

- Lưu source VHDL gốc để tra cứu và làm golden reference.
- Không chỉnh sửa trực tiếp khi port Verilog.
- Nếu cần patch VHDL để chạy simulation, tạo branch riêng và ghi rõ trong PR.

Quy tắc:

- Không format lại hàng loạt.
- Không đổi tên file gốc.
- Nếu source gốc lớn hoặc có binary/IP nặng, cân nhắc dùng Git LFS hoặc không đưa vào repo chính.

### `rtl_verilog/`

```text
rtl_verilog/
  README.md
  tx/
    com1827_tx.sv
    burst_tx.sv
    rom_fil1.sv
    cpm_filtersx4.sv
    cpm_filtersx8.sv
    cic_interp4.sv
    firhalfband3.sv
    signed_sin_cos_tbl3.sv
    lfsr11p.sv
    lfsr11prom.sv
  rx/
    com1827_rx.sv
    receiver1b.sv
    agc17.sv
    agc21.sv
    bias_removal.sv
    digital_dc3.sv
    cic.sv
  demod/
    cpm_demod.sv
    resampling31.sv
    symbol_timing_loop5.sv
    carrier_tracking.sv
    afc2.sv
    cpm_mf.sv
    cpm_msd3.sv
    cpm_va_pmu.sv
    cpm_va_acs.sv
    fast_frequency_detection.sv
  common/
    delay2.sv
    fifo.sv
    divider.sv
    bram_dp2.sv
    add8.sv
    add16.sv
    ha.sv
    fa.sv
  top/
    modem_core_top.sv
  stubs/
    README.md
```

Vai trò:

- Đây là nơi đặt code Verilog/SystemVerilog mới.
- Chia theo luồng chức năng: TX, RX, demod, common, top.
- `top/modem_core_top.sv` là top tối giản cho modem core, không phụ thuộc LAN/FEC/peripheral/debug.
- `stubs/` chứa module tạm dùng để unblock integration, phải ghi rõ là stub.

Quy tắc:

- Mỗi module port từ VHDL nên giữ tên gần giống file/entity gốc.
- Mỗi file đầu nên có comment:

```systemverilog
// Ported from: original_vhdl/src/CPM_MOD/burst_tx.vhd
// Owner:
// Reviewer:
// Verification:
// Notes:
```

### `tb/`

```text
tb/
  README.md
  block/
    tb_signed_sin_cos_tbl3.sv
    tb_cic_interp4.sv
    tb_firhalfband3.sv
    tb_rom_fil1.sv
    tb_burst_tx.sv
  integration/
    tb_com1827_tx.sv
    tb_receiver1b.sv
    tb_cpm_demod.sv
    tb_modem_loopback.sv
  common/
    tb_pkg.sv
    clock_reset_tasks.sv
    compare_tasks.sv
```

Vai trò:

- `block/`: testbench từng module.
- `integration/`: testbench ghép TX, RX, demod, loopback.
- `common/`: task/function dùng chung cho clock/reset/file I/O/compare.

Quy tắc:

- Mỗi module RTL nên có ít nhất một testbench block-level.
- Testbench tối thiểu gồm:
  - reset
  - zero/constant input
  - impulse hoặc step
  - PRBS/random nếu phù hợp
  - reset giữa chừng nếu module có state
  - ghi output ra file nếu cần MATLAB compare

### `sim/`

```text
sim/
  README.md
  vivado/
    run_block_tests.tcl
    run_tx_tests.tcl
    run_loopback.tcl
  modelsim/
    run_block_tests.do
    run_loopback.do
  scripts/
    run_all.ps1
    clean_sim.ps1
  results/
    block/
    integration/
    regression/
  waves/
    README.md
```

Vai trò:

- Lưu script chạy simulation và output simulation.
- `results/` lưu log, text output, compare result.
- `waves/` chỉ lưu waveform quan trọng, không lưu mọi file `.wdb/.wlf` quá nặng.

Quy tắc:

- Không commit file simulation quá nặng nếu không cần.
- Nếu cần lưu waveform làm bằng chứng, đặt tên rõ:

```text
waves/2026_06_18_burst_tx_sync_en_case1.wcfg
results/block/burst_tx_case1_pass.log
```

### `matlab/`

```text
matlab/
  README.md
  golden/
    soqpsk_tx_golden.m
    cic_interp_ref.m
    firhalfband_ref.m
  vectors/
    tx/
    rx/
    loopback/
  compare/
    compare_txt_vectors.m
    compare_tx_iq.m
    compare_filter_output.m
  plots/
```

Vai trò:

- Lưu script MATLAB tạo vector và so sánh output.
- `golden/` chứa model tham chiếu hoặc script tính output kỳ vọng.
- `vectors/` chứa input/output vector dạng `.txt`, `.csv`, `.mat`.
- `compare/` chứa script compare VHDL/Verilog/MATLAB.
- `plots/` chứa ảnh kết quả quan trọng.

Quy tắc:

- Vector nhỏ có thể commit.
- Vector lớn nên nén hoặc để ngoài repo, ghi link/path trong README.
- Mỗi script compare nên ghi input file và output report rõ ràng.

### `doc/`

```text
doc/
  README.md
  notes/
    00_project_inventory.md
    Readme_timeline.md
    Readme_teamwork_timeline.md
    Instruction_Github.md
    module_port_status.md
    dev_log.md
    open_issues.md
    learning_log.md
  design/
    tx_core_architecture.md
    rx_core_architecture.md
    demod_core_architecture.md
    modem_core_top.md
  weekly/
    week_01_report.md
    week_02_report.md
  reports/
    verification_report.md
    tx_mvp_report.md
    rx_mvp_report.md
    core_mvp_release_note.md
```

Vai trò:

- `notes/`: ghi chú làm việc, timeline, inventory, reading notes.
- `design/`: tài liệu thiết kế sau khi đã ổn định hơn.
- `weekly/`: báo cáo tuần.
- `reports/`: báo cáo kiểm chứng và release.

File tracking quan trọng:

| File | Chức năng |
|---|---|
| `module_port_status.md` | Theo dõi module nào đã có note, RTL, TB, sim, review, pass. |
| `dev_log.md` | Log từng ngày của team. |
| `open_issues.md` | Lỗi còn mở, owner, deadline, trạng thái. |
| `learning_log.md` | Ghi lại từng thành viên đã học/làm/trình bày gì. |
| `verification_report.md` | Tổng hợp kết quả MATLAB/Vivado. |

### `scripts/`

```text
scripts/
  README.md
  python/
    compare_vectors.py
    parse_xsim_log.py
  tcl/
    create_vivado_project.tcl
    run_xsim_regression.tcl
  powershell/
    run_all_tests.ps1
    clean_outputs.ps1
```

Vai trò:

- Tự động hóa các bước lặp đi lặp lại.
- Ưu tiên script tạo project thay vì commit project Vivado nặng.

### `project/`

```text
project/
  vivado/
    README.md
    create_project.tcl
    filelist_core.tcl
  modelsim/
    README.md
    compile.do
    simulate.do
```

Vai trò:

- Lưu script tạo/chạy project.
- Không nên commit toàn bộ thư mục generated của Vivado/ModelSim.

### `releases/`

```text
releases/
  README.md
  tx_mvp/
    release_note.md
  rx_frontend_mvp/
    release_note.md
  core_mvp/
    release_note.md
```

Vai trò:

- Lưu release note nội bộ theo mốc.
- Không nhất thiết copy toàn bộ RTL vào đây; chỉ ghi commit hash/tag và kết quả kiểm chứng.

## 4. File README cần có

### `README.md` ở root repo

Nội dung nên có:

```markdown
# COM1827 SOQPSK Verilog Port

## Mục tiêu
Port core SOQPSK modem từ VHDL sang Verilog/SystemVerilog, giữ nguyên ý tưởng, thuật toán và luồng xử lý tín hiệu.

## Cấu trúc repo
Mô tả ngắn các folder chính.

## Quick start
1. Clone repo
2. Mở Vivado/ModelSim
3. Chạy block test
4. Chạy loopback test

## Team workflow
Branch, PR, review, issue tracking.

## Trạng thái hiện tại
Link tới `doc/notes/module_port_status.md`.
```

### README trong từng folder

Mỗi folder lớn nên có `README.md` ngắn:

- Folder này chứa gì?
- Ai phụ trách chính?
- Cách chạy hoặc dùng file trong folder.
- File nào là entry point?

## 5. Quy ước đặt tên file

| Loại file | Quy ước | Ví dụ |
|---|---|---|
| RTL Verilog | lower_snake_case theo module gốc | `burst_tx.sv` |
| Testbench | `tb_<module>.sv` | `tb_burst_tx.sv` |
| MATLAB compare | `compare_<target>.m` | `compare_tx_iq.m` |
| Vector input | `<module>_<case>_in.txt` | `rom_fil1_fsk_in.txt` |
| Vector output | `<module>_<case>_out.txt` | `rom_fil1_fsk_out.txt` |
| Simulation log | `<module>_<case>_<pass/fail>.log` | `burst_tx_sync_pass.log` |
| Weekly report | `week_XX_report.md` | `week_01_report.md` |

## 6. Branch và Pull Request workflow

### Branch naming

```text
feature/<owner>/<module>
fix/<owner>/<issue-short-name>
docs/<owner>/<doc-name>
test/<owner>/<module>
integration/<target>
```

Ví dụ:

```text
feature/tien/burst-tx
feature/thinh/rom-fil1
test/thanh/com1827-tx
docs/nguyet/module-status
integration/khanh/tx-mvp
```

### Quy trình PR

1. Tạo branch từ `main`.
2. Làm module/task.
3. Cập nhật tài liệu liên quan.
4. Chạy test tối thiểu.
5. Mở Pull Request.
6. Gắn reviewer.
7. Sửa theo review.
8. Merge khi pass.

### PR template đề xuất

```markdown
## Mục tiêu

## File thay đổi

## Test đã chạy
- [ ] Compile
- [ ] Block simulation
- [ ] Compare với VHDL/MATLAB
- [ ] Waveform đã kiểm tra

## Kết quả

## Lỗi còn mở / giả định

## Checklist
- [ ] RTL đúng interface đã chốt
- [ ] Reset/valid/enable đã kiểm tra
- [ ] Bit width/signedness đã kiểm tra
- [ ] Tài liệu đã cập nhật
- [ ] `module_port_status.md` đã cập nhật
```

## 7. Issue tracking

Dùng GitHub Issues cho task/lỗi lớn. Mỗi issue nên có:

| Trường | Nội dung |
|---|---|
| Title | Ngắn gọn, có module |
| Owner | Người phụ trách |
| Type | `doc`, `rtl`, `tb`, `sim`, `matlab`, `integration`, `bug` |
| Priority | `P0`, `P1`, `P2` |
| Due | Ngày cần xong |
| Definition of Done | Điều kiện xong rõ ràng |

Label đề xuất:

```text
P0-core
P1-verification
P2-later
rtl
testbench
matlab
documentation
bug
integration
good-first-rtl
needs-review
blocked
```

`good-first-rtl` dùng cho module phù hợp với Nguyệt hoặc thành viên mới.

## 8. Quy tắc commit

Commit message nên ngắn và có prefix:

```text
docs: add burst_tx reading note
rtl: port cic_interp4
tb: add tb_rom_fil1 cases
sim: add vivado run script for tx
matlab: add tx iq compare script
fix: correct burst_tx state counter
chore: update module status
```

Mỗi commit nên tập trung một việc. Tránh commit lẫn RTL, waveform nặng, file project generated và tài liệu không liên quan.

## 9. Quy định không nên commit

Không nên commit:

```text
*.jou
*.log lớn không cần thiết
*.wdb
*.wlf
*.vcd lớn
*.bit
*.mcs
*.runs/
*.cache/
*.hw/
*.ip_user_files/
*.sim/
*.Xil/
```

Có thể commit:

- Log nhỏ chứng minh pass/fail.
- Waveform config nhỏ `.wcfg`.
- Vector test nhỏ.
- Report Markdown.
- Script tạo project/chạy sim.

## 10. `.gitignore` đề xuất

```gitignore
# Vivado generated
.Xil/
*.jou
*.str
*.log
*.wdb
*.wcfg.bak
*.runs/
*.cache/
*.hw/
*.ip_user_files/
*.sim/

# ModelSim/Questa
work/
transcript
*.wlf
*.vstf

# Simulation dumps
*.vcd
*.fst
*.ghw

# FPGA outputs
*.bit
*.bin
*.mcs
*.ltx

# MATLAB temp
*.asv
*.fig

# OS/editor
.DS_Store
Thumbs.db
.vscode/*.log
```

Lưu ý: nếu muốn commit một số `.log` nhỏ trong `sim/results`, có thể dùng rule whitelist sau:

```gitignore
!sim/results/**/*.log
```

## 11. Quy trình làm một module

Ví dụ với `BURST_TX`:

1. Tạo issue: `Port BURST_TX to SystemVerilog`.
2. Tạo branch: `feature/tien/burst-tx`.
3. Đọc:
   - `original_vhdl/src/CPM_MOD/burst_tx.vhd`
   - `doc/notes/01_01_burst_tx_reading.md`
4. Tạo RTL:
   - `rtl_verilog/tx/burst_tx.sv`
5. Tạo testbench:
   - `tb/block/tb_burst_tx.sv`
6. Chạy simulation:
   - log vào `sim/results/block/burst_tx_*`
7. Cập nhật:
   - `doc/notes/module_port_status.md`
   - `doc/notes/open_issues.md` nếu có lỗi
   - `doc/notes/learning_log.md` nếu có phần học/trình bày
8. Mở PR.
9. Khánh/Reviewer review.
10. Merge khi pass.

## 12. Bảng trạng thái module mẫu

File: `doc/notes/module_port_status.md`

```markdown
# Module Port Status

| Nhóm | Module | Owner | Note | RTL | TB | Sim | Review | Status | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| TX | signed_sin_cos_tbl3 | Tiến | done | done | done | pass | pass | done | latency 2 CLK |
| TX | cic_interp4 | Thịnh | done | wip | wip | fail | pending | wip | kiểm tra R=4 |
| TX | lfsr11prom | Nguyệt | done | wip | pending | pending | pending | wip | good-first-rtl |
```

## 13. Dev log mẫu

File: `doc/notes/dev_log.md`

```markdown
# Dev Log

## 2026-06-18

| Người | Việc đã làm | Kết quả | Lỗi/câu hỏi | Việc tiếp |
|---|---|---|---|---|
| Khánh | Review BURST_TX FSM | phát hiện zero preamble cần test | cần waveform case FIRST_PREAMBLE=0 | review TB |
| Tiến | Port byte repacking | compile pass | SOF alignment chưa rõ | chạy case SOF |
| Nguyệt | Tạo vector sin/cos | xong 16 điểm test | cần học cách đọc waveform | pair với Tiến |
```

## 14. Open issues mẫu

File: `doc/notes/open_issues.md`

```markdown
# Open Issues

| ID | Module | Mức | Owner | Mô tả | Trạng thái | Deadline |
|---|---|---|---|---|---|---|
| ISS-001 | BURST_TX | P0 | Tiến | `ZERO_FIRST_PREAMBLE` không thấy dùng, cần test FIRST_PREAMBLE=0 | open | Day 13 |
| ISS-002 | CIC_INTERP4 | P1 | Thịnh | `SAMPLE_CLK_IN` không thấy dùng trong logic active | investigating | Day 8 |
```

## 15. Learning log mẫu

File: `doc/notes/learning_log.md`

```markdown
# Learning Log

| Ngày | Người | Nội dung học/làm | Bằng chứng | Ghi chú tiếp theo |
|---|---|---|---|---|
| Day 6 | Nguyệt | Hiểu quadrant mapping của sine/cos LUT | waveform + vector MATLAB | tiếp tục ROM/PROM |
| Day 9 | Nguyệt | Port `LFSR11PROM` | TB pass address/data | học thêm always_ff |
| Day 12 | Tiến | Debug FSM `BURST_TX` | waveform sync/gap/payload | cần review với Khánh |
```

## 16. Release note mẫu

File: `releases/tx_mvp/release_note.md`

```markdown
# TX MVP Release

## Commit/tag

## Phạm vi

## Module đã hoàn thành

## Test đã chạy

## Kết quả

## Lỗi còn mở

## Cách chạy lại simulation
```

## 17. Quy tắc bảo vệ `main`

Khuyến nghị GitHub settings:

- Không push trực tiếp vào `main`.
- PR cần ít nhất 1 reviewer.
- PR vào các mốc lớn như TX MVP/RX MVP/core MVP cần Khánh review.
- Không merge nếu compile hoặc test cơ bản fail mà không ghi rõ lý do.
- Dùng tag cho mốc:

```text
tx-mvp-day18
rx-frontend-mvp-day27
core-mvp-day45
```

## 18. Kết luận

Cấu trúc repo nên phục vụ hai mục tiêu cùng lúc:

1. Tạo sản phẩm kỹ thuật: SOQPSK modem core Verilog có kiểm chứng.
2. Tạo năng lực team: mỗi người đọc được code, port được module, chạy được simulation, hiểu waveform và biết báo cáo trạng thái.

Team nên bắt đầu đơn giản:

- Đưa VHDL gốc vào `original_vhdl/`.
- Tạo `rtl_verilog/`, `tb/`, `sim/`, `matlab/`, `doc/`.
- Tạo ngay các file tracking trong `doc/notes`.
- Làm việc bằng branch + PR + review.
- Mỗi module đi theo vòng: **đọc VHDL -> note -> Verilog -> TB -> sim -> compare -> review -> merge**.
