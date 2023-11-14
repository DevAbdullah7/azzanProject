with open('input_file.txt', 'r') as f:
    lines = f.readlines()

unique_lines = []
counter = -2
for i in lines:
    counter += 1
    if not i == lines[counter]:
        unique_lines.append(i)

with open('output_file.txt', 'w') as f:
    for line in unique_lines:
        f.write(line)