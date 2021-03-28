import yaml
import os


class GetYaml():
    def __init__(self, file_path):
        # whether the file exist or not
        if os.path.exists(file_path):
            self.file_path = file_path
        else:
            print('cannot find %s path' % file_path)

        self.data = self.read_yaml()

    def read_yaml(self):
        with open(self.file_path, 'r', encoding='utf-8')as f:
            p = f.read()
            return p

    def get_data(self, key=None):
        result = yaml.load(self.data, Loader=yaml.FullLoader)
        # whether the key exist or not
        if key == None:
            return result
        else:
            return result.get(key)


if __name__ == '__main__':
    read_yaml = GetYaml('login.yaml')
    xx = read_yaml.get_data('pass')
    print(xx)
