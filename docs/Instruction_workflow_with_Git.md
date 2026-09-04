# Sổ tay workflow local <-> GitHub cho team COM1827 SOQPSK

Tài liệu này dành cho các thành viên mới làm việc nhóm qua GitHub. Mục tiêu là giúp mọi người biết cách lấy source từ GitHub về máy, tạo nhánh làm việc riêng, commit thay đổi, đẩy lên GitHub, mở Pull Request (PR - yêu cầu gộp branch của mình vào branch chính để cả team review trước khi merge), nhận review, cập nhật code mới từ team và xử lý conflict cơ bản.

Tinh thần chung:

- Không làm trực tiếp trên `main`.
- Mỗi task/module làm trên một branch riêng.
- Commit nhỏ, rõ nội dung.
- Pull code mới thường xuyên.
- Mở Pull Request (PR) để cả team review trước khi merge vào `main`.
- Không tự ý sửa/xóa file người khác nếu chưa trao đổi.

## 1. Các khái niệm cần nhớ

| Khái niệm | Ý nghĩa ngắn gọn |
|---|---|
| Repository / repo | Kho chứa toàn bộ source code, tài liệu, testbench, script. |
| Local repo | Bản repo nằm trên máy cá nhân. |
| Remote repo | Bản repo nằm trên GitHub. Thường tên remote là `origin`. |
| Branch | Nhánh làm việc. Mỗi người tạo branch riêng cho task của mình. |
| `main` | Nhánh chính, chỉ chứa code đã review/ổn định. |
| Commit | Một lần ghi lại thay đổi vào lịch sử Git. |
| Push | Đẩy commit từ máy local lên GitHub. |
| Pull | Kéo thay đổi mới từ GitHub về local. |
| Pull Request / PR | Pull Request, thường viết tắt là PR: yêu cầu gộp branch của mình vào `main` hoặc branch tích hợp. PR là nơi cả team xem code, comment review, kiểm tra test và chấp thuận trước khi merge. |
| Merge | Gộp thay đổi từ branch này sang branch khác. |
| Conflict | Xung đột khi hai người sửa cùng một vùng code/file. |

## 2. Cài đặt ban đầu

### 2.1. Cài Git

Kiểm tra Git đã có chưa:

```powershell
git --version
```

Nếu chưa có, tải Git for Windows:

```text
https://git-scm.com/download/win
```

### 2.2. Cấu hình tên và email

Chỉ cần làm một lần trên máy:

```powershell
git config --global user.name "Ten Cua Ban"
git config --global user.email "email_cua_ban@example.com"
```

Kiểm tra:

```powershell
git config --global --list
```

### 2.3. Đăng nhập GitHub

Cách dễ nhất cho người mới:

1. Cài GitHub Desktop hoặc GitHub CLI.
2. Đăng nhập bằng tài khoản GitHub.
3. Nếu dùng terminal thuần, có thể dùng HTTPS và nhập token khi GitHub yêu cầu.

Kiểm tra remote sau khi clone:

```powershell
git remote -v
```

## 3. Clone repo về máy

Chọn thư mục làm việc, ví dụ:

```powershell
cd D:\FPGA_Projects
```

Clone repo:

```powershell
git clone https://github.com/<org-hoac-user>/<repo-name>.git
```

Đi vào repo:

```powershell
cd <repo-name>
```

Kiểm tra trạng thái:

```powershell
git status
```

Kết quả tốt thường là:

```text
On branch main
Your branch is up to date with 'origin/main'.
nothing to commit, working tree clean
```

## 4. Chu trình làm việc hằng ngày

Mỗi ngày nên theo chu trình này:

```text
pull main mới nhất
  -> tạo branch task
  -> làm việc
  -> kiểm tra status/diff
  -> commit
  -> push
  -> mở Pull Request
  -> nhận review
  -> sửa nếu cần
  -> merge
  -> quay lại main và pull mới
```

## 5. Bắt đầu một task mới

Ví dụ bạn Tiến nhận task port `BURST_TX`.

### 5.1. Về nhánh `main`

```powershell
git switch main
```

Nếu Git cũ không có `switch`, dùng:

```powershell
git checkout main
```

### 5.2. Kéo code mới nhất

```powershell
git pull origin main
```

### 5.3. Tạo branch mới

Quy ước branch:

```text
feature/<ten>/<module>
test/<ten>/<module>
docs/<ten>/<noi-dung>
fix/<ten>/<loi>
```

Ví dụ:

```powershell
git switch -c feature/tien/burst-tx
```

Hoặc:

```powershell
git checkout -b feature/tien/burst-tx
```

Kiểm tra branch hiện tại:

```powershell
git branch
```

Branch đang đứng sẽ có dấu `*`.

## 6. Làm việc và kiểm tra thay đổi

Sau khi sửa/tạo file, kiểm tra:

```powershell
git status
```

Xem nội dung thay đổi:

```powershell
git diff
```

Xem thay đổi của một file:

```powershell
git diff -- rtl_verilog/tx/burst_tx.sv
```

Xem danh sách file thay đổi ngắn gọn:

```powershell
git status --short
```

Ý nghĩa ký hiệu thường gặp:

| Ký hiệu | Ý nghĩa |
|---|---|
| `M` | File đã sửa |
| `A` | File mới được add |
| `D` | File bị xóa |
| `??` | File mới Git chưa theo dõi |

## 7. Add và commit

### 7.1. Add file cần commit

Add một file:

```powershell
git add rtl_verilog/tx/burst_tx.sv
```

Add nhiều file:

```powershell
git add rtl_verilog/tx/burst_tx.sv tb/block/tb_burst_tx.sv doc/notes/module_port_status.md
```

Add toàn bộ thay đổi hiện tại:

```powershell
git add .
```

Lưu ý: `git add .` tiện nhưng dễ add nhầm file log/waveform nặng. Nên chạy `git status` trước.

### 7.2. Commit

Commit với message rõ:

```powershell
git commit -m "rtl: port burst_tx datapath"
```

Một số prefix nên dùng:

| Prefix | Khi dùng |
|---|---|
| `rtl:` | Thay đổi RTL Verilog/SystemVerilog |
| `tb:` | Thêm/sửa testbench |
| `sim:` | Script/kết quả mô phỏng |
| `matlab:` | MATLAB script/vector/plot |
| `docs:` | Tài liệu Markdown |
| `fix:` | Sửa lỗi |
| `chore:` | Cập nhật nhỏ, tracking, cleanup |

Ví dụ:

```powershell
git commit -m "tb: add burst_tx sync_en test cases"
git commit -m "docs: update module port status for burst_tx"
git commit -m "fix: correct burst_tx sof alignment"
```

## 8. Push branch lên GitHub

Lần đầu push branch mới:

```powershell
git push -u origin feature/tien/burst-tx
```

Các lần sau chỉ cần:

```powershell
git push
```

Sau khi push, vào GitHub sẽ thấy nút tạo Pull Request.

## 9. Mở Pull Request

Trên GitHub:

1. Vào repo.
2. Chọn tab **Pull requests**.
3. Chọn **New pull request**.
4. Base branch: `main`.
5. Compare branch: branch của bạn, ví dụ `feature/tien/burst-tx`.
6. Điền mô tả PR.
7. Gắn reviewer: thường là Khánh và người liên quan.
8. Submit PR.

PR description nên có:

```markdown
## Mục tiêu
Port BURST_TX datapath/FSM sang Verilog.

## File thay đổi
- rtl_verilog/tx/burst_tx.sv
- tb/block/tb_burst_tx.sv
- doc/notes/module_port_status.md

## Test đã chạy
- [x] Compile
- [x] Block simulation
- [ ] Compare VHDL/Verilog

## Kết quả
Case SYNC_EN=0 pass, SYNC_EN=1 còn cần kiểm tra gap.

## Lỗi còn mở
ISS-001: kiểm tra FIRST_PREAMBLE_EXTENSION=0.
```

## 10. Nhận review và sửa PR

Nếu reviewer comment cần sửa:

1. Sửa file ở local trên đúng branch.
2. Kiểm tra:

```powershell
git status
git diff
```

3. Add và commit:

```powershell
git add rtl_verilog/tx/burst_tx.sv
git commit -m "fix: handle burst_tx zero gap case"
```

4. Push:

```powershell
git push
```

Pull Request trên GitHub sẽ tự cập nhật.

## 11. Sau khi PR được merge

Sau khi PR merge vào `main`, local của bạn cần cập nhật.

### 11.1. Quay lại `main`

```powershell
git switch main
```

### 11.2. Pull code mới

```powershell
git pull origin main
```

### 11.3. Xóa branch local nếu đã xong

```powershell
git branch -d feature/tien/burst-tx
```

Nếu branch chưa merge mà vẫn muốn xóa, Git sẽ cảnh báo. Không dùng `-D` nếu chưa chắc.

### 11.4. Xóa branch remote nếu cần

Thường GitHub có nút **Delete branch** sau khi merge PR. Có thể bấm trên web.

## 12. Cập nhật branch đang làm khi `main` có thay đổi mới

Trong lúc bạn đang làm branch riêng, người khác merge PR vào `main`. Bạn nên cập nhật branch của mình.

Đang ở branch của bạn:

```powershell
git branch
```

Fetch dữ liệu mới:

```powershell
git fetch origin
```

Merge `main` mới vào branch hiện tại:

```powershell
git merge origin/main
```

Nếu không conflict, Git sẽ tự merge.

Sau đó chạy test lại.

Đẩy branch đã cập nhật:

```powershell
git push
```

## 13. Xử lý conflict cơ bản

Conflict xảy ra khi hai người sửa cùng một vùng file.

Khi merge bị conflict, Git sẽ báo file conflict. Kiểm tra:

```powershell
git status
```

Mở file conflict, bạn sẽ thấy dạng:

```text
<<<<<<< HEAD
code của branch mình
=======
code từ branch khác/main
>>>>>>> origin/main
```

Cách xử lý:

1. Đọc cả hai phần.
2. Giữ phần đúng hoặc kết hợp cả hai.
3. Xóa các dòng marker:
   - `<<<<<<< HEAD`
   - `=======`
   - `>>>>>>> origin/main`
4. Lưu file.
5. Add file đã xử lý:

```powershell
git add <file-bi-conflict>
```

6. Commit merge:

```powershell
git commit -m "fix: resolve merge conflict"
```

7. Chạy test lại.
8. Push:

```powershell
git push
```

Nếu conflict khó, không tự đoán. Hỏi owner file hoặc Khánh.

## 14. Các lệnh an toàn khi bị rối

### 14.1. Xem mình đang ở đâu

```powershell
git status
git branch
```

### 14.2. Xem lịch sử commit ngắn gọn

```powershell
git log --oneline --graph --decorate --all -20
```

### 14.3. Xem file nào đã thay đổi

```powershell
git status --short
```

### 14.4. Bỏ thay đổi ở một file chưa commit

Cẩn thận: lệnh này làm mất thay đổi local của file đó.

```powershell
git restore <file>
```

Ví dụ:

```powershell
git restore sim/results/temp.log
```

### 14.5. Bỏ file đã add ra khỏi staging

Không mất nội dung file, chỉ bỏ khỏi vùng chuẩn bị commit:

```powershell
git restore --staged <file>
```

### 14.6. Lưu tạm thay đổi chưa commit

Khi đang làm dở nhưng cần chuyển branch:

```powershell
git stash push -m "wip burst_tx debug"
```

Xem stash:

```powershell
git stash list
```

Lấy lại stash:

```powershell
git stash pop
```

Lưu ý: stash cũng có thể conflict khi pop.

## 15. Các lệnh nên tránh nếu chưa hỏi

Không dùng các lệnh này nếu chưa hiểu rõ hoặc chưa hỏi leader:

```powershell
git reset --hard
git clean -fd
git push --force
git rebase
git branch -D <branch>
```

Lý do:

| Lệnh | Rủi ro |
|---|---|
| `git reset --hard` | Xóa toàn bộ thay đổi local chưa commit. |
| `git clean -fd` | Xóa file mới chưa được Git track. |
| `git push --force` | Có thể ghi đè lịch sử remote, ảnh hưởng người khác. |
| `git rebase` | Dễ gây rối lịch sử nếu chưa quen. |
| `git branch -D` | Xóa branch dù chưa merge. |

## 16. Quy trình làm việc theo vai trò

### 16.1. Owner module

Ví dụ owner là Thịnh, module `ROM_FIL1`.

```powershell
git switch main
git pull origin main
git switch -c feature/thinh/rom-fil1
```

Làm việc:

- Đọc VHDL gốc.
- Đọc note thiết kế.
- Tạo/sửa RTL trong `rtl_verilog/`.
- Cập nhật `module_port_status.md`.
- Commit và push.
- Mở PR.

### 16.2. Người viết testbench

Ví dụ Thanh viết testbench cho `ROM_FIL1`:

```powershell
git switch main
git pull origin main
git switch -c test/thanh/rom-fil1
```

Làm việc:

- Tạo `tb/block/tb_rom_fil1.sv`.
- Thêm vector nếu cần.
- Chạy simulation.
- Lưu log nhỏ vào `sim/results/`.
- Mở PR.

### 16.3. Người viết tài liệu

Ví dụ Nguyệt cập nhật status:

```powershell
git switch main
git pull origin main
git switch -c docs/nguyet/module-status
```

Làm việc:

- Cập nhật `doc/notes/module_port_status.md`.
- Cập nhật `doc/notes/learning_log.md`.
- Commit:

```powershell
git add doc/notes/module_port_status.md doc/notes/learning_log.md
git commit -m "docs: update module and learning status"
git push -u origin docs/nguyet/module-status
```

## 17. Ví dụ workflow hoàn chỉnh

Task: Nguyệt port `LFSR11PROM`.

```powershell
git switch main
git pull origin main
git switch -c feature/nguyet/lfsr11prom
```

Tạo/sửa file:

```text
rtl_verilog/tx/lfsr11prom.sv
tb/block/tb_lfsr11prom.sv
doc/notes/module_port_status.md
doc/notes/learning_log.md
```

Kiểm tra:

```powershell
git status
git diff
```

Add:

```powershell
git add rtl_verilog/tx/lfsr11prom.sv
git add tb/block/tb_lfsr11prom.sv
git add doc/notes/module_port_status.md
git add doc/notes/learning_log.md
```

Commit:

```powershell
git commit -m "rtl: port lfsr11prom"
```

Push:

```powershell
git push -u origin feature/nguyet/lfsr11prom
```

Mở Pull Request trên GitHub và gắn reviewer:

- Reviewer: Tiến, Khánh
- Verifier: Thanh

Sau khi PR merge:

```powershell
git switch main
git pull origin main
git branch -d feature/nguyet/lfsr11prom
```

## 18. Checklist trước khi mở PR

Trước khi mở PR, tự kiểm tra:

| Checklist | Đã làm |
|---|---|
| Đang ở đúng branch task, không phải `main` | `[ ]` |
| `git status` không có file lạ bị add nhầm | `[ ]` |
| Commit message rõ ràng | `[ ]` |
| Code compile hoặc đã ghi rõ chưa compile được | `[ ]` |
| Testbench đã chạy hoặc ghi rõ chưa chạy được | `[ ]` |
| Tài liệu/status liên quan đã cập nhật | `[ ]` |
| Không commit file nặng như `.wdb`, `.wlf`, `.bit`, project generated | `[ ]` |
| PR mô tả rõ test đã chạy và lỗi còn mở | `[ ]` |

## 19. Checklist khi review PR của người khác

Reviewer nên kiểm tra:

| Nội dung | Câu hỏi |
|---|---|
| Interface | Port/module name có đúng thống nhất không? |
| Clock/reset | Reset active level, synchronous/asynchronous có đúng VHDL không? |
| Valid/enable | Output valid có align với data không? |
| Bit width | Signed/unsigned, truncation, saturation có đúng không? |
| Test | Có test case tối thiểu chưa? |
| Tài liệu | `module_port_status.md` hoặc note có cập nhật không? |
| File rác | Có commit file generated/nặng không? |

Review không chỉ để bắt lỗi, mà để cả team hiểu module.

## 20. Khi nào cần hỏi leader

Hỏi Khánh hoặc owner liên quan khi:

- Muốn đổi interface module.
- Muốn đổi thuật toán so với VHDL.
- Gặp conflict khó.
- Simulation Verilog khác VHDL nhưng chưa rõ vì sao.
- Cần dùng `git reset`, `git clean`, `push --force`, `rebase`.
- Muốn merge code dù test chưa pass.

## 21. Lệnh tóm tắt hay dùng

```powershell
# Xem trạng thái
git status

# Lấy code mới nhất
git switch main
git pull origin main

# Tạo branch mới
git switch -c feature/<ten>/<module>

# Xem thay đổi
git diff

# Add và commit
git add <file>
git commit -m "rtl: port <module>"

# Push branch mới
git push -u origin feature/<ten>/<module>

# Cập nhật branch đang làm với main mới nhất
git fetch origin
git merge origin/main

# Sau khi PR merge
git switch main
git pull origin main
git branch -d feature/<ten>/<module>
```

## 22. Kết luận

Workflow chuẩn của team:

```text
main mới nhất
  -> branch riêng
  -> làm task nhỏ
  -> commit rõ ràng
  -> push
  -> Pull Request
  -> review
  -> sửa
  -> merge
  -> pull main mới nhất
```

Nếu mọi người giữ đúng quy trình này, repo sẽ sạch, dễ review, dễ rollback, và tiến độ teamwork sẽ rõ ràng hơn rất nhiều.
