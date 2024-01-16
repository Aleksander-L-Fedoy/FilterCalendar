# Python script for å synkronisere filer

def sync_files(original_file, duplicate_file):
    try:
        # Les de første N linjene fra duplikatfilen
        with open(duplicate_file, 'r') as file:
            lines = file.readlines()
            for idx, val in enumerate(lines):
                if val == "\n":
                    print(f"{idx = }")
                    break
            first_lines = lines[:idx+1]

        # Les resten av originalfilen
        with open(original_file, 'r') as file:
            lines = file.readlines()
            for idx, val in enumerate(lines):
                if val == "\n":
                    print(f"{idx = }")
                    break
            rest_of_file = lines[idx + 1:]

        # Kombiner og skriv til duplikatfilen
        with open(duplicate_file, 'w') as file:
            file.writelines(first_lines + rest_of_file)

        print(f"Fil '{duplicate_file}' ble oppdatert basert på '{original_file}'")

    except FileNotFoundError:
        print(f"Feil: En av filene '{original_file}' eller '{duplicate_file}' ble ikke funnet.")
    except Exception as e:
        print(f"En uventet feil oppstod: {e}")

    
if __name__ == '__main__':
    # Definer filstier
    original_file = './filtrerKalender.js'
    duplicate_file = './.filtrerKalenderKopi.js'

    sync_files(original_file,duplicate_file)

    original_file = './sletteKalender.js'
    duplicate_file = './.sletteKalenderKopi.js'

    sync_files(original_file,duplicate_file)