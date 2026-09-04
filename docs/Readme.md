## Hướng dẫn doc/:

design/: tài liệu thiết kế sau khi đã ổn định

notes/: Ghi chú làm việc, timeline, inventory và reading notes

reports/: báo cáo kiểm chứng và releases

weekly/: báo cáo tuần

Instruction_Github.md: Tài liệu hướng dẫn sử dụng repo chung cho toàn dự án

Instruction_workflow_with_Git.md: Tài liệu hướng dẫn các bước làm việc với Git kèm các câu lệnh đơn giản cho người mới bắt đầu.

## Ví dụ kho lưu trữ:
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

File tracking quan trọng:

| File | Chức năng |
|---|---|
| `module_port_status.md` | Theo dõi module nào đã có note, RTL, TB, sim, review, pass. |
| `dev_log.md` | Log từng ngày của team. |
| `open_issues.md` | Lỗi còn mở, owner, deadline, trạng thái. |
| `learning_log.md` | Ghi lại từng thành viên đã học/làm/trình bày gì. |
| `verification_report.md` | Tổng hợp kết quả MATLAB/Vivado. |
